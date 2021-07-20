<template>
  <div class="contents">
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div v-else class="form-wrapper form-wrapper-sm">
      <form
        @submit.prevent="submitForm"
        class="form"
        :class="{ mobile: $isMobile() }"
      >
        <div class="dhcp-container">
          <input type="checkbox" id="dhcp" v-model="dhcp" />
          <label for="dhcp">DHCP</label>
        </div>
        <div>
          <label for="address">IP address</label>
          <input
            type="text"
            id="address"
            v-model="address"
            autocomplete="off"
            maxlength="15"
            :disabled="dhcp"
          />
        </div>
        <div>
          <label for="netmask">Subneet mask</label>
          <input
            type="text"
            id="netmask"
            v-model="netmask"
            autocomplete="off"
            maxlength="15"
            :disabled="dhcp"
          />
        </div>
        <div>
          <label for="gateway">Default gateway</label>
          <input
            type="text"
            id="gateway"
            v-model="gateway"
            autocomplete="off"
            maxlength="15"
            :disabled="dhcp"
          />
        </div>
        <div>
          <label for="dns1">Preferred DNS server</label>
          <input
            type="text"
            id="dns1"
            v-model="dns1"
            autocomplete="off"
            maxlength="15"
            :disabled="dhcp"
          />
        </div>
        <div>
          <label for="dns2">Alternate DNS server</label>
          <input
            type="text"
            id="dns2"
            v-model="dns2"
            autocomplete="off"
            maxlength="15"
            :disabled="dhcp"
          />
        </div>
        <button type="submit" class="btn">Apply</button>
      </form>
    </div>
  </div>
</template>

<script>
import { setNetworkConfig, getNetworkConfig } from "../api/network.js";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      address: "",
      netmask: "",
      gateway: "",
      dns1: "",
      dns2: "",
      dhcp: true,
      isLoading: false,
    };
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      try {
        await setNetworkConfig({
          address: this.address,
          netmask: this.netmask,
          gateway: this.gateway,
          nameservers: [this.dns1, this.dns2],
          dhcp: this.dhcp,
        });
      } catch (error) {
        alert(error.response.statusText);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async created() {
    this.isLoading = true;
    try {
      const { data } = await getNetworkConfig();
      this.address = data.address;
      this.netmask = data.netmask;
      this.gateway = data.gateway;
      this.dns1 = data.dns1;
      this.dns2 = data.dns2;
      this.dhcp = data.dhcp;

    } catch (error) {
      this.address = '';
      this.netmask = '';
      this.gateway = '';
      this.dns1 = '';
      this.dns2 = '';
      this.dhcp = false;
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.dhcp-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.dhcp-container label {
  display: flex;
  font-size: 16pt;
  color: white;
  vertical-align: middle;
  line-height: 22px;
  padding-left: 5px;
}

.dhcp-container input {
  display: flex;
  width: 25px;
  height: 25px;
}

input:disabled {
  background: #ffffff20;
  cursor: not-allowed;
}
</style>
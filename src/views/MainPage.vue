<template>
  <div class="contents">
    <loading-spinner
      v-if="$store.getters.isLoadingCams | isLoading"
    ></loading-spinner>
    <div v-else class="form-wrapper form-wrapper-sm">
      
      <form
        @submit.prevent="submitForm"
        class="form"
        :class="{ mobile: $isMobile() }"
      >
        <div>
          <label for="username">Target NVT</label>
          <select v-model="target">
            <option
              v-for="cam in $store.state.cams"
              :key="cam.hostname"
              :value="cam"
            >
              {{ cam.hostname }}
            </option>
          </select>
        </div>
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            autocomplete="off"
          />
        </div>
        <button type="submit" class="btn">Apply</button>
      </form>
    </div>
  </div>
</template>

<script>
import { setTarget, getTarget } from "../api/onvif";

import LoadingSpinner from "../components/common/LoadingSpinner.vue";
export default {
  components: { LoadingSpinner },
  data() {
    return {
      target: "",
      username: "",
      password: "",
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    try {
      this.$store.dispatch("discoveryCams");
      const { data } = await getTarget();
      this.target = { hostname: data.hostname, port: data.port };
      this.username = data.username;
      this.password = data.password;
    } catch (error) {
      switch (error.response.status) {
        case 401:
          this.$store.dispatch("Signout");
          this.$router.push("/");
          break;
        default:
          alert(error.message);
          break;
      }
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async submitForm() {
      this.isLoading = true;

      try {
        await setTarget(
          this.target.hostname,
          this.target.port,
          this.username,
          this.password
        );
      } catch (error) {
        alert(error);
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.btn {
  color: white;
}
.signup-message {
  margin-top: 10px;
  font-size: 10pt;
  color: #8e9297;
}

a:hover {
  text-decoration: underline;
}
</style>
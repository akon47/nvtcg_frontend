<template>
  <div class="contents">
    <loading-spinner
      v-if="$store.getters.isLoadingCams | isLoading"
    ></loading-spinner>
    <div v-else class="form-wrapper form-wrapper-sm">
      <h1>NVT CG</h1>
      <form
        @submit.prevent="submitForm"
        class="form"
        :class="{ mobile: $isMobile() }"
      >
        <div>
          <label for="username">Target</label>
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
            type="text"
            id="password"
            v-model="password"
            autocomplete="off"
          />
        </div>
        <button type="submit" class="btn">Apply</button>
      </form>
      <form class="form" :class="{ mobile: $isMobile() }">
        <div>
          <label for="attachment" style="padding-top: 20px"
            >Overlay Image</label
          >
          <div class="filebox">
            <label for="attachment" >Upload</label>
            <input
              @change="handleFileChange"
              id="attachment"
              class="attachment-file"
              type="file"
              accept=".png"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { setTarget, getTarget } from "../api/onvif";
import { uploadOverlayImage } from "../api/overlay";

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
    this.$store.dispatch("discoveryCams");

    const { data } = await getTarget();
    this.target = { hostname: data.hostname, port: data.port };
    this.username = data.username;
    this.password = data.password;

    this.isLoading = false;
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
    async handleFileChange(e) {
      const file = e.target.files[0];
      try {
        if(file) {
          this.isLoading = true;
          await uploadOverlayImage(file);
          this.isLoading = false;
        }
      } catch (error) {
        alert(error.response.statusText);
      }
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
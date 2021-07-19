<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <h1>Login</h1>
      <form @submit.prevent="submitForm" class="form" :class="{ mobile: $isMobile() }">
          <div>
          <label for="username">Username</label>
          <input type="text" id="username" value="admin" readonly />
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
        <button
          v-bind:disabled="!isPasswordValid"
          type="submit"
          class="btn"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      logMessage: ""
    };
  },
  computed: {
    isPasswordValid() {
      return this.password.length > 0;
    }
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          username: 'admin',
          password: this.password
        };
        await this.$store.dispatch("Signin", userData);
        this.$router.push("/main");
      } catch (error) {
        console.log(error);
        this.logMessage = error.response.data;
        alert(this.logMessage);
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.password = "";
    }
  }
};
</script>

<style>
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

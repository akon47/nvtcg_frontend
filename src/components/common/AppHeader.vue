<template>
  <header>
    <div v-if="!$isMobile() || !isUserLogin">
      <router-link v-bind:to="logoLink" class="logo">
        NVT CG
        <span v-if="isUserLogin">by admin</span>
      </router-link>
    </div>
    <div class="navigations">
      <template v-if="isUserLogin">
        <router-link to="/main">Home</router-link>
        <router-link to="/overlay">Overlay</router-link>
        <router-link to="/network">Network</router-link>
        <a href="javascript:;" @click="logoutUser" class="logout-button">
          Logout
        </a>
      </template>
      <template v-else>
        <router-link to="/signin">Login</router-link>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    logoLink() {
      return this.$store.getters.isLogin ? "/main" : "/";
    },
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("Signout");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
.username {
  color: white;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #36393f;
  z-index: 2000;
  height: 60px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.6));
  border-bottom: 1px solid black;
}
a {
  color: #dedede;
  font-size: 18px;
}

a:hover {
  text-decoration: none;
}

a.logo {
  font-size: 30px;
  font-weight: 900;
  color: white;
}
.logo > span {
  font-size: 14px;
  font-weight: normal;
}
.navigations a {
  margin-left: 10px;
}
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
}
.logout-button {
  font-size: 14px;
}
a.router-link-exact-active {
  color: white;
  font-weight: bold;
}

.mobile-header {
  color: darkgray;
}

.mobile-header .header-icon {
  margin: 6px;
}
.mobile-header .selected {
  color: white;
}
</style>

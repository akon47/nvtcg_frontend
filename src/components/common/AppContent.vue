<template>
  <div class="content-container">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {

};
</script>

<style scoped>
.content-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.content {
  background-color: #313131;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.15s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>

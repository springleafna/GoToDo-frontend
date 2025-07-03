<script setup>
import Siderbar from './components/test/Siderbar.vue';

</script>

<template>
  <div class="app-container">
    <Siderbar />
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;

  background-color: rgb(245, 245, 245);
}
.main-content {
  flex: 1;
}
</style>

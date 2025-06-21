<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DraggableList from './components/DraggableList.vue'

</script>

<template>
  <div class="app-container">
    <RouterView />
    <DraggableList />
  </div>
</template>

<style scoped>

</style>

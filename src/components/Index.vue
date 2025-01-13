<template>
  <div class="index-page">
    <Header/>
    <!-- <MainContent/> -->
    <router-view />
  </div>
</template>

<script setup>
import Header from './Header.vue'
/* import MainContent from './MainContent.vue' */
</script>

<style scoped>
.index-page {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
</style>

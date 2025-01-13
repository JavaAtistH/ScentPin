<template>
  <div class="index-page">
    <Header/>
    <MainContent/>
   <Reserve/>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import MainContent from './MainContent.vue'
import Reserve from './Reserve.vue';


</script>

<style scoped>
.index-page {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
</style>

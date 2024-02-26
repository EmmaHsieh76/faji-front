<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows="hover"
    height="calc(100vh - 64px)"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      cover
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    src: new URL('@/assets/Carousel-1.jpg', import.meta.url).href
  },
  {
    src: new URL('@/assets/Carousel-2.jpg', import.meta.url).href
  },
  {
    src: new URL('@/assets/Carousel-3.jpg', import.meta.url).href
  },
  {
    src: new URL('@/assets/Carousel-4.jpg', import.meta.url).href
  },

])

</script>

<style scoped>

</style>

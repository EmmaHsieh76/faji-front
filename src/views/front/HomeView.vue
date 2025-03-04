<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows="hover"
    height="calc(100vh - 284px)"
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
    src: new URL('@/assets/Carousel-5.png', import.meta.url).href
  },
  {
    src: new URL('@/assets/Carousel-6.png', import.meta.url).href
  },
  {
    src: new URL('@/assets/Carousel-7.png', import.meta.url).href
  }
])

</script>

<style scoped>

</style>

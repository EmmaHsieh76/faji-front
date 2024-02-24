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
    src: '../../../public/Carousel-3.jpg'
  },
  {
    src: '../../../public/Carousel-4.jpg'
  },
  {
    src: '../../../public/Carousel-2.jpg'
  },
  {
    src: '../../../public/Carousel-5.jpg'
  }
])

</script>

<style scoped>

</style>

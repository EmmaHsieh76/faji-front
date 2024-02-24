<template>
  <v-container>
    <v-row
    v-for="(item, i) in items" :key="i"
      >
      <v-col cols="4"
      >
        <v-img
        width="auto"
        height="225"
        aspect-ratio="1/1"
        cover
        :src="item.image"
        >
        </v-img>
      </v-col>
      <v-col cols="8">
        <v-card
        variant="flat"
        >
          <div>
              <h2>{{ item.text1 }}</h2>
              <v-divider class="mb-6"></v-divider>
              <p>{{ item.text2 }}</p>
              <p>{{ item.text3 }}</p>
              <p>{{ item.text4 }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    image: new URL('@/assets/1.jpg',import.meta.url).href,
    text1: '鳳梨冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/2.jpg',import.meta.url).href,
    text1: '米苔目冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/3.jpg',import.meta.url).href,
    text1: '粉粿冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/4.jpg',import.meta.url).href,
    text1: '粉粿冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/5.jpg',import.meta.url).href,
    text1: '粉粿冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },

])

</script>

<style scoped>
p{
  margin-bottom: 10px;
  font-size: 1rem;
}
</style>

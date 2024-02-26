<template>
  <v-container>
    <v-row
    v-for="(item, i) in items" :key="i" class="mb-5 mx-auto"
      >
      <v-col cols="12" md="4"
      >
        <v-img
        class="left"
        width="auto"
        height="225"
        aspect-ratio="1/1"
        cover
        :src="item.image"
        rounded="lg"
        >
        </v-img>
      </v-col>
      <v-col class="right" cols="12" md="8">
        <h2>{{ item.text1 }}</h2>
        <v-divider class="mb-6"></v-divider>
        <p>{{ item.text2 }}</p>
        <p>{{ item.text3 }}</p>
        <p>{{ item.text4 }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const items = ref([
  {
    image: new URL('@/assets/ice-1.jpg', import.meta.url).href,
    text1: '鳳梨冰',
    text2: '以新鮮的鳳梨，經由手工削皮切片，保留了每一絲果肉的飽滿香氣。每一片鳳梨都是經過精心挑選，確保口感豐腴，為您帶來最天然、新鮮的水果風味。',
    text3: '採用古法熬煮的紅糖水，將濃郁的甘甜與鳳梨的清新完美結合。透過時間的淬煉，每一滴糖水都帶有濃郁的風味，為鳳梨冰增添了一抹深邃的韻味。',
    text4: '讓您在炎炎夏日中，感受來自大自然的天然甜蜜，盡情享受一份鳳梨冰的清新美好。'
  },
  {
    image: new URL('@/assets/ice-2.jpg', import.meta.url).href,
    text1: '米苔目冰',
    text2: '挑選上等在來米粉，經過精心煮製，經過流水冷卻，使口感Q彈不軟爛',
    text3: ' 米苔目的質地柔軟，容易被消化吸收，適合作為容易消化的食物，特別是對於一些消化不良的人群。',
    text4: '更讓人在炎炎夏日中感受到一陣清新，是味蕾和心靈的雙重享受。'
  },
  {
    image: new URL('@/assets/ice-3.jpg', import.meta.url).href,
    text1: '粉粿冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/ice-4.jpg', import.meta.url).href,
    text1: '綜合冰',
    text2: '由人氣Q彈粉粿：爽口米苔目與清涼解渴的愛玉，交織出豐富口感饗宴。',
    text3: '搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '多層口感融合，讓您沉浸在味蕾的饗宴中，和心靈的雙重享受。'
  },
  {
    image: new URL('@/assets/ice-5.jpg', import.meta.url).href,
    text1: '仙草冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/ice-6.jpg', import.meta.url).href,
    text1: '愛玉冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/ice-7.jpg', import.meta.url).href,
    text1: '綠豆冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/ice-8.jpg', import.meta.url).href,
    text1: '杏仁冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  },
  {
    image: new URL('@/assets/ice-9.jpg', import.meta.url).href,
    text1: '粉條冰',
    text2: '精選新鮮地瓜粉，以水與精選地瓜粉調配的黃金比例，每日慢火攪拌，經過一晚的冷卻，使口感恰好的彈牙不過硬。',
    text3: '運用梔子花提取的天然色素，再搭配古法熬煮的紅糖水，在陽光的淋浴下，綻放著迷人的繽紛色彩，讓每一口都是視覺和味覺的雙重享受。',
    text4: '這不僅是一碗粉粿，而是承載著滿滿古早回憶，帶您進入時光隧道回到舊往時光，品味懷舊風情。'
  }
])

onMounted(() => {
  gsap
    .from('.left', {
      // x: '-100%',
      opacity: 0,
      duration: 1,
      ease: 'ease-in',
      stagger: 0.5
    })
  gsap
    .from('.right', {
      // x: '100%',
      opacity: 0,
      duration: 1,
      ease: 'ease-in',
      stagger: 0.5
    })
})

</script>

<style scoped>
p{
  margin-bottom: 10px;
  font-size: 1rem;
}
</style>

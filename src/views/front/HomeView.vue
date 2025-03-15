<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows="hover"
    height="calc(100vh - 64px)"
  >
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <RouterLink to="/introduce">
        <!-- 背景圖片 -->
        <div class="carousel-image" :style="{ backgroundImage: `url(${item.src})` }">
          <!-- 半透明遮罩，根據 index 切換位置 -->
          <div
            class="overlay"
            :class="{ 'overlay-left': i % 2 !== 0, 'overlay-right': i % 2 === 0 }"
          ></div>

          <!-- 文字內容，根據 index 切換位置 -->
          <v-container class="text-container" :class="{ 'text-left': i % 2 !== 0, 'text-right': i % 2 === 0 }">
            <v-row :justify="i % 2 !== 0 ? 'start' : 'end'">
              <v-col cols="12" sm="7" md="6"  class="text-center">
                <h1 id="title" class="font-weight-black mb-5">{{ item.title }}</h1>
                <h1 id="text" class="font-weight-bold"
                >{{ item.text }}</h1>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </RouterLink>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    src: new URL('@/assets/Carousel-8.jpg', import.meta.url).href,
    title: '品味經典',
    text: '新鮮每日現做'
  },
  {
    src: new URL('@/assets/Carousel-9.jpg', import.meta.url).href,
    title: '米香彈牙',
    text: '感受純粹米香'
  },
  {
    src: new URL('@/assets/Carousel-10.jpg', import.meta.url).href,
    title: '嚴選品質',
    text: '黃金比例熬煮'
  },
  {
    src: new URL('@/assets/Carousel-11.jpg', import.meta.url).href,
    title: '懷舊甜點',
    text: '回想兒時記憶'
  }
])
</script>

<style scoped>
.carousel-image {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* 半透明遮罩 */
.overlay {
  position: absolute;
  top: 0;
  width: 40%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4); /* 白色半透明 */
}

.overlay-left {
  left: 0; /* 在左邊 */
}

.overlay-right {
  right: 0; /* 在右邊 */
}

/* 文字區塊 */
.text-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}

.text-left {
  left: 0;
}

.text-right {
  right: 0;
}

/* 響應式設計 */
@media (max-width: 600px) {
  /* 小螢幕時調整遮罩和文字的位置 */
  .overlay {
    width: 100%; /* 完全覆蓋 */
    height: 50%; /* 只覆蓋一半 */
    top: 50%; /* 從中間開始覆蓋 */
    transform: translateY(-50%);
    display: block!important; /* 顯示遮罩 */
  }

  .overlay-left, .overlay-right {
    display: none; /* 隱藏左右遮罩 */
  }

  .text-container {
    top: 50%; /* 改變文字區塊的位置 */
    transform: translateY(-50%);
  }

  .text-left, .text-right {
    text-align: center; /* 文字居中 */
  }

  #title {
  color: rgba(0, 0, 0, 0.65);
  font-size: 5rem; /* 調整標題字體大小 */
}

  #text {
  font-size: 3rem; /* 調整內文字體大小 */
  color: rgba(0, 0, 0, 0.65);
  letter-spacing: 5px;
  }

}

/* sm */
@media (min-width: 601px) {

  .overlay {
    width: 60%;
  }

  #title {
    color: rgba(0, 0, 0, 0.65);
    letter-spacing: 7px!important;
    font-size: 6rem;
  }

  #text {
    color: rgba(0, 0, 0, 0.65);
    letter-spacing: 10px!important;
    font-size: 3rem;
  }
}

/* md */
@media (min-width: 960px) {

  .overlay {
    width: 40%;
  }
}

</style>

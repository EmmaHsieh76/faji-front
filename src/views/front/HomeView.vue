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
            class="overlay d-flex align-center justify-center flex-column"
            :class="{ 'overlay-left': i % 2 !== 0, 'overlay-right': i % 2 === 0 }"
          >
            <div class="text-content text-center">
              <h1 class="carousel-title font-weight-black mb-5">{{ item.title }}</h1>
              <h1 class="carousel-text font-weight-bold">{{ item.text }}</h1>
            </div>

          </div>
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
  height: 100%;
  background: rgba(255, 255, 255, 0.4); /* 白色半透明 */
  transition: all 0.5s ease; /* 讓變換尺寸更平滑 */
  padding: 20px; /* 內邊距 */
}

.overlay-left {
  left: 0; /* 在左邊 */
}

.overlay-right {
  right: 0; /* 在右邊 */
}

/* 文字區塊 */
.carousel-title {
  color: rgba(0, 0, 0, 0.65);
  letter-spacing: 7px !important;
  font-size: 6rem; 
}

.carousel-text {
  color: rgba(0, 0, 0, 0.65);
  letter-spacing: 10px !important;
  font-size: 2.5rem; 
}

/* 響應式設計：根據螢幕大小調整遮罩和文字尺寸 */
/* RWD：手機版 (xs) */
@media (max-width: 600px) {
  .overlay {
    width: 100% !important;   /* 寬度撐滿 */
    height: 40% !important;   /* 高度縮小，避免全遮 */
    top: 50% !important;      /* 垂直居中 */
    left: 50% !important;
    transform: translate(-50%, -50%); /* 靠這行在手機版完美置中 */
  }

  .carousel-title {
    font-size: 3rem; /* 手機版字體縮小，避免爆開 */
  }

  .carousel-text {
    font-size: 1.8rem;
  }
}

/* RWD：平板 (sm) */
@media (min-width: 601px) {
  .overlay {
    width: 60%;
  }
  
  .carousel-title {
    font-size: 4rem;
  }

  .carousel-text {
    font-size: 2.2rem;
  }
}

/* RWD：電腦版 (md 以上) */
@media (min-width: 960px) {
  .overlay {
    width: 40%;
  }

  .carousel-title {
    font-size: 5rem;
  }

  .carousel-text {
    font-size: 2.5rem;
  }
}

</style>

<template>
  <!-- <v-container>
    <v-row class="mt-16">
      <v-col cols="3" class="d-flex justify-center">
        <v-card
          min-width="250"
        >
          <v-list>
            <v-list-subheader>快速預訂</v-list-subheader>
            <v-divider></v-divider>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="third"
              rounded="xl"
            >
            <v-list-item-title class="ps-5">{{item.text}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-table>
          <tr >
            <td colspan="2" class="d-flex justify-center">
              <v-img
              :width="350"
              :height="350"
              aspect-ratio="1/1"
              cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img>
            </td>
          </tr>
          <tr><br></tr>
          <tr class="d-flex justify-center">
            <td>
              <v-img
            :width="70"
            :height="70"
            aspect-ratio="1/1"
            class="ma-2 pa-2"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
            </td>
            <td>
              <v-img
            :width="70"
            :height="70"
            aspect-ratio="1/1"
            class="ma-2 pa-2"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
            </td>
          </tr>
        </v-table>
      </v-col>
      <v-col cols="4">
        <v-sheet>
          <h2><font color="#D92323">【人氣商品】</font>&nbsp;粉粿</h2>
          <v-divider></v-divider>
          <p class="mt-2">精選優質地瓜澱粉</p>
          <p>口感Q彈有嚼勁</p>
          <p>直接搭配古法熬煮的濃郁紅糖即可食用</p>
          <p>變換吃法:搭配愛玉、鳳梨、牛奶等，以增添層次感和風味</p>
          <br>
          <br>
          <p>重量: 約500g</p>
          <p>
            請於收到後立即放入冰箱冷藏保存，並於冷藏3天內食用完畢，以確保粉粿新鮮美味。
          </p>
          <br>
          <v-row>
            <v-col clos="3" class="pt-5">
                <p class="font-weight-bold">$&nbsp;{{50}}</p>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="selectedNumber"
                type="number"
                variant="outlined"
                :min="0"
                :step="1"
                style="width: 80px;padding:0px"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col clos="6">
              <v-btn color="seventh" prepend-icon="mdi-cart"  @click="addCart">加入購物車</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
  </v-row>
  </v-container> -->
  <!-- ====================================== -->
  <!-- 上課教學 -->
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">商品資訊</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="6" lg="4" v-for="product in products" :key="product._id" class="d-flex justify-center">
        <ProductCard v-bind="product"></ProductCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import ProductCard from '@/components/ProductCard.vue'
import gsap from 'gsap'

const { api } = useApi()
const createSnackbar = useSnackbar()

// const selectedNumber = ref(0)

const products = ref([])

// const items = ref([
//   { text: '粉粿' },
//   { text: '米苔目' },
//   { text: '粉條' },
//   { text: '愛玉' },
//   { text: '鳳梨' },
//   { text: '仙草' },
//   { text: '杏仁' }
// ])

onMounted(async () => {
  try {
    const { data } = await api.get('/products', {
      params: {
        itemsPerPage: -1
      }
    })
    products.value.push(...data.result.data)
    await nextTick()
    // gsap用法
    gsap
      .to('.product-card', { opacity: 1, duration: 0.5 })
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
})
</script>

<style>
th{
  color:#3f000f
}

.v-field__input {
  padding-top: 0px;
  padding-bottom: 0px;
  min-height: 40px;
}
</style>

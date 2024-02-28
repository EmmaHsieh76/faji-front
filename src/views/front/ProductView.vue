<template>
  <v-container max-width="1200">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center third">商品資訊</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="6" lg="4" v-for="product in products" :key="product._id" class="d-flex justify-center product" >
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
      .from('.product', { opacity: 0, duration: 0.7, stagger: 0.3 })
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

<template>
  <v-card class="product-card" width="380">
    <RouterLink
    :to="'/products/' + _id"
    class="text-decoration-none text-ninth"
    >
    <v-img
        :src="images[0]"
        cover
        width="100%"
        height="300"
      >
    </v-img>
    <v-card-title class="font-weight-bold text-h5 my-0 py-1">
      {{name}}
    </v-card-title>
    </RouterLink>
    <p class="px-4 my-2">售價${{price}}</p>
    <!--  white-space:pre => 才能顯示後端文字說明的換行，不然字會在同一行-->
    <!-- <v-card-text style="white-space:pre"> {{ description }}</v-card-text> -->
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-text-field type="number" min="1" v-model.number="quantity.value.value"  variant="outlined" placeholder="數量"
      style="width: 95%;"
      class="mx-auto mb-0"
      ></v-text-field>
      <v-btn type="submit" prepend-icon="mdi-cart" :loading="isSubmitting"
      style="width:100%; height: 50px;" color="seventh" >加入購物車</v-btn>
    </v-form>
    <!-- <v-card-actions>
      <v-btn color="seventh" prepend-icon="mdi-cart" variant='elevated' @click="addCart" width="100%">加入購物車</v-btn>
    </v-card-actions> -->
  </v-card>
</template>
<!-- class="text-decoration-none text-ninth font-weight-bold text-h5 " -->
<script setup>
// 自己加的===========
import { ref, onMounted } from 'vue'
// ===================
import { useApi } from '@/composables/axios'
// 換掉原本預設的購物車值，原本設定為0
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
// 自己加的===========
// import { useRoute } from 'vue-router'
import { useForm, useField } from 'vee-validate'
// ===================

const { api, apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()

// 自己加
// const route = useRoute()
// =============

// 有哪些接收的資料
const props = defineProps(['_id', 'category', 'description', 'images', 'name', 'price', 'sell'])

const addCart = async () => {
  // 如果使用者沒有登入，就導向登入頁面
  if (!user.isLogin) {
    router.push('/signup')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: props._id,
      quantity: 1
    })
    user.cart = data.result
    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
  } catch (error) {
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
}

// 自己做的加入購物車
const product = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  images: [],
  sell: true,
  category: ''
})

const { isSubmitting, handleSubmit } = useForm({
  initialValues: {
    quantity: 1
  }
})

const quantity = useField('quantity')

const submit = handleSubmit(async (values) => {
  if (!user.isLogin) {
    createSnackbar({
      text: '請先登入再加入購物車',
      showCloseButton: false,
      snackbarProps: {
        timeout: 1000,
        color: 'red',
        location: 'top'
      }
    })
    router.push('/signup')
    return
  }
  if (user.blacklist) {
    createSnackbar({
      text: '您已被停權，無法加入購物車',
      showCloseButton: false,
      snackbarProps: {
        timeout: 1000,
        color: 'red',
        location: 'top'
      }
    })
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: props._id,
      quantity: values.quantity
    })
    user.cart = data.result
    createSnackbar({
      text: '新增成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
  } catch (error) {
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

onMounted(async () => {
  try {
    const { data } = await api.get('/products/')
    product.value._id = data.result._id
    product.value.name = data.result.name
    product.value.price = data.result.price
    product.value.description = data.result.description
    product.value.images = data.result.images
    product.value.sell = data.result.sell
    product.value.category = data.result.category
  } catch (error) {
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
    router.push('/')
  }
})
</script>

<style>
</style>

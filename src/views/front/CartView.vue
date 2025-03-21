<template>
<v-form>
<v-container>
  <v-row>
  <v-col cols="12">
    <h1 class="text-center">購物清單</h1>
  </v-col>
  <v-divider></v-divider>
  <v-col cols="12">
    <v-data-table
    class="text-h5 font-weight-bold"
    :items="cart"
    :headers="headers"
    >
      <template #[`item.product.images[0]`]="{ item }" class="d-flex justify-center">
        <div class="d-flex justify-center my-3"> 
          <RouterLink :to="'/products/'+ item.product._id"  style="width: 100px; height: 100px">
            <v-img
            :src="item.product.images[0]"
            width="100"
            height="100"
            cover
            rounded="lg"
            ></v-img>
          </RouterLink>
        </div>
      </template>
      <template #[`item.product.name`]="{item}">
        <span v-if="item.product.sell">{{item.product.name}}</span>
        <span class="text-red text-decoration-line-through" v-else>{{item.product.name}}(已下架)</span>
      </template>
      <template #[`item.product.price`]="{item}">${{ item.product.price }}</template>
      <template #[`item.quantity`]="{item}">
        <v-btn
        variant="text" icon="mdi-minus" color="seventh" @click="addCart(item.product._id, -1)"
        ></v-btn>
        {{ item.quantity }}
        <v-btn
        variant="text" icon="mdi-plus" color="third" @click="addCart(item.product._id, 1)"
        >
        </v-btn>
      </template>
      <template #[`item.total`]="{item}">
        ${{ item.product.price * item.quantity }}
      </template>
      <template #[`item.action`]="{ item }">
        <v-btn variant="text" icon="mdi-delete" color="seventh" @click="addCart(item.product._id, item.quantity * -1)"></v-btn>
      </template>
    </v-data-table>
  </v-col>
  <v-col class="d-flex align-center justify-space-between" cols="12">
    <p class="text-h5 font-weight-bold">總金額</p>
    <p><strong class="text-red text-h4">NT.{{total}}</strong></p>
  </v-col>
  <v-col cols="12">
    <v-sheet height="100%" width="100%" rounded color="grey-lighten-5 py-3 text-center">
      <h4 class="ps-2 text-h5 font-weight-bold">【取貨人資料】</h4>
    </v-sheet>
  </v-col>
  <v-col cols="12" md="3">
    <VMenu
      v-model="isMenuOpen"
      :close-on-content-click="false">
      <template #activator="{ props }">
        <VTextField
          label="取貨日期"
          variant="outlined"
          :model-value="selectedDate"
          prepend-inner-icon="mdi-calendar-range"
          color="forth"
          readonly
          v-bind="props"
          :rules="[rules.required]"

           />
      </template>
      <VDatePicker
        @input="isMenuOpen = false"
        v-model="DateValue"
        :allowed-dates="allowedDates"
        :min="minDate"
        max="2025-12-31"
        color="forth" />
    </VMenu>
  </v-col>
  <v-col cols="12" md="3">
    <v-select
      label="取貨時間"
      color="forth"
      variant="outlined"
      prepend-inner-icon="mdi-clock-time-four-outline"
      :items="times"
      :rules="[rules.required]"
      v-model="time" />
  </v-col>
  <v-col cols="12" md="3">
    <v-text-field
      label="姓名"
      prepend-inner-icon="mdi-account-circle-outline"
      variant="outlined"
      color="forth"
      v-model="name"
      :rules="[rules.required]" />
  </v-col>
  <v-col cols="12" md="3">
    <v-text-field
      label="電話"
      variant="outlined"
      prepend-inner-icon="mdi-cellphone"
      color="forth"
      v-model="phone"
      :rules="[rules.required]"
      />
  </v-col>
  <v-col class="text-center" cols="12">
    <v-btn size="x-large" color="seventh" :disabled="!canCheckout" :loading="isSubmitting" @click="checkout">確認送出</v-btn>
  </v-col>
</v-row>
</v-container>
</v-form>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

const isMenuOpen = ref(false)
const DateValue = ref(null)

const selectedDate = computed(() => {
  if (!DateValue.value) return null
  return DateValue.value.toLocaleDateString()
})

const time = ref(null)
const times = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00'
]
// 預定日期選擇，只能選後天之後，且不能選星期三
const today = new Date()
const dayAfterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
const minDate = dayAfterTomorrow.toISOString()

const allowedDates = val => {
  const dayOfWeek = new Date(val).getDay()
  return dayOfWeek !== 3 // 3 是星期三
}

// 預設取貨人名字跟電話為會員資料
const name = ref('')
const phone = ref('')
name.value = user.name
phone.value = user.phone

const rules = ref({
  required: value => !!value || '必填欄位'
})
const cart = ref([])
const headers = [
  { title: '圖片', key: 'product.images[0]', align: 'center',sortable: false },
  { title: '名稱', key: 'product.name', align: 'center',sortable: false },
  { title: '單價', key: 'product.price', align: 'center',sortable: true },
  { title: '數量', key: 'quantity', align: 'center',sortable: true },
  { title: '總價', key: 'total', value: item => item.product.price * item.quantity, align: 'center',sortable: true },
  { title: '刪除', key: 'action', align: 'center',sortable: false }
]

const total = computed(() => {
  return cart.value.reduce((total, current) => {
    return total + current.quantity * current.product.price
  }, 0)
})

const canCheckout = computed(() => {
  return cart.value.length > 0 && !cart.value.some(item => !item.product.sell)
})

const addCart = async (product, quantity) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product,
      quantity
    })
    user.cart = data.result
    createSnackbar({
      text: '修改成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'forth',
        location: 'bottom'
      }
    })
    const idx = cart.value.findIndex(item => item.product._id === product)
    cart.value[idx].quantity += quantity
    if (cart.value[idx].quantity <= 0) {
      cart.value.splice(idx, 1)
    }
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'seventh',
        location: 'bottom'
      }
    })
  }
}

const isSubmitting = ref(false)
const checkout = async () => {
  isSubmitting.value = true
  try {
    // 結帳=>新增到訂單頁
    await apiAuth.post('/orders', {
      date: selectedDate.value,
      time: time.value,
      name: name.value,
      phone: phone.value
    })
    // pinia保存的購物車數量歸零
    user.cart = 0
    createSnackbar({
      text: '結帳成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'forth',
        location: 'bottom'
      }
    })
    // 路由導向訂單頁
    router.push('/member/')
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'seventh',
        location: 'bottom'
      }
    })
  }
  isSubmitting.value = false
}

onMounted(async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.value.push(...data.result)
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'seventh',
        location: 'bottom'
      }
    })
  }
})
</script>

<style scoped>
.seventh{
  color:"#D92323"!important;
}
</style>

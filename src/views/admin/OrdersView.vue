<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center mt-5 text-sixth">訂單管理</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="orders" :headers="headers">
          <template #[`item.createdAt`]="{ item }">
             {{ new Date(item.createdAt).toLocaleDateString() }}
          </template>
          <template #[`item.date`]="{ item }">
             {{ new Date(item.date).toLocaleDateString() }}
          </template>
          <template #[`item.cart`]="{ item }">
            <ul>
              <li v-for="cart in item.cart" :key="cart._id">
                 {{ cart.product.name }} * {{ cart.quantity }}
              </li>
            </ul>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const orders = ref([])
const headers = [
  { title: '訂單編號', align: 'center', key: '_id' },
  { title: '帳號', align: 'center', key: 'user.account' },
  { title: '取貨人', align: 'center', key: 'name' },
  { title: '取貨日', align: 'center', key: 'date' },
  { title: '取貨時間', align: 'center', key: 'time' },
  { title: '商品', align: 'center', key: 'cart', sortable: false },
  {
    title: '訂購金額',
    key: 'price',
    value: (item) => {
      return item.cart.reduce((total, current) => {
        return total + current.quantity * current.product.price
      }, 0)
    }
  }
]

onMounted(async () => {
  try {
    const { data } = await apiAuth.get('/orders/all')
    orders.value.push(...data.result)
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
</style>

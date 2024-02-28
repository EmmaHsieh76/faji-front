<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <h1 class="text-center mt-5 text-sixth">商品管理</h1>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12">
      <VDataTableServer
      v-model:items-per-page="tableItemsPerPage"
      v-model:sort-by="tableSortBy"
      v-model:page="tablePage"
      :items="tableProducts"
      :headers="tableHeaders"
      :loading="tableLoading"
      :items-length="tableItemsLength"
      :search="tableSearch"
      @update:items-per-page="tableLoadItems"
      @update:sort-by="tableLoadItems"
      @update:page="tableLoadItems"
      hover
      >
        <template #top>
          <v-row class="mb-1">
            <v-col cols="8" class="d-flex justify-start align-center">
              <v-btn color="sixth" variant="outlined" @click="openDialog()"
              size="x-large"
              >新增商品
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-card
                color="grey-lighten-6"
                max-width="40vw"
              >
                <v-card-text>
                  <v-text-field
                  label="搜尋商品"
                  clearable
                  density="compact"
                  variant="outlined"
                  hide-details
                  color="blue-darken-4"
                  append-inner-icon="mdi-magnify"
                  v-model="tableSearch"
                  @click:append="tableApplySearch"
                  @keydown.enter="tableApplySearch"
                  >
                  </v-text-field>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template #[`item.image`]="{item}">
          <v-img :src="item.images[0]" height="13vh"></v-img>
        </template>
        <template #[`item.sell`]="{item}">
          <v-icon color="sixth" :icon="item.sell ? 'mdi-check':'mdi-minus'"
          size="large"></v-icon>
        </template>
        <template #[`item.edit`]="{item}">
        <v-btn icon="mdi-pencil" variant="text"
        size="large"
        color="sixth"
        @click="openDialog(item)"
        ></v-btn>
        </template>
        <template #[`item.remove`]="{item}">
          <v-btn icon="mdi-delete" variant="text" color="seventh" @click="openDialogRemove(item)"></v-btn>
        </template>
      </VDataTableServer>
    </v-col>
  </v-row>
</v-container>

<!-- 刪除商品確認視窗 -->
<v-dialog v-model="dialogRemove" width="300px">
  <v-card rounded="xl">
    <v-card-text>確認要刪除此項商品嗎?</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="seventh" rounded @click="closeDialogRemove">取消</v-btn>
      <v-btn color="sixth" rounded @click="remove">確定刪除</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- persistent 點擊對話框外無反應 -->
<v-dialog v-model="dialog" persistent width="500px">
  <v-form :disabled="isSubmitting" @submit.prevent="submit">
    <v-card>
    <v-card-title> {{ dialogId === ''? '新增商品' : '編輯商品'}}</v-card-title>
    <v-card-text>
      <v-text-field
      label="名稱"
      v-model="name.value.value"
      variant="outlined"
      :error-messages="name.errorMessage.value"
      ></v-text-field>
      <v-text-field
      label="價格"
      type="number" min="0"
      v-model="price.value.value"
      variant="outlined"
      :error-messages="price.errorMessage.value"
      ></v-text-field>
      <v-select
      label="分類"
      :items="categories"
      v-model="category.value.value"
      variant="outlined"
      :error-messages="category.errorMessage.value"
      ></v-select>
      <v-checkbox
      label="上架"
      v-model="sell.value.value"
      variant="outlined"
      :error-messages="sell.errorMessage.value"
      ></v-checkbox>
      <v-textarea
      label="商品說明"
      placeholder="商品說明"
      variant="outlined"
      v-model="description.value.value"
      class="py-5"
      :error-messages="description.errorMessage.value"
      ></v-textarea>
      <VueFileAgent
      v-model="fileRecords"
      v-model:rawModelValue="rawFileRecords"
      multiple="true"
      accept="image/png, image/jpeg, image/jpg"
      deletable
      :error-text="{type:'檔案格式不支援',size:'檔案超過 1MB 限制'}"
      help-text="點擊檔案或拖曳檔案至此"
      :max-files="3"
      max-size="1MB"
      ref="fileAgent"
      ></VueFileAgent>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red" variant="tonal" :disabled="isSubmitting" @click="closeDialog">取消</v-btn>
      <v-btn color="blue-darken-4" variant="tonal" type="submit" :loading="isSubmitting">送出</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</v-dialog>

</template>

<script setup>
import { ref } from 'vue'
// 驗證套件
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const fileAgent = ref(null)

// 表單對話框開啟的狀態
const dialog = ref(false)
// 表單對話框正在編輯的商品 id ，空字串為新增商品
const dialogId = ref('')

// 表格裡刪除對話框開啟的狀態
const dialogRemove = ref(false)

// 開啟編輯對話框
const openDialog = (item) => {
  if (item) {
    dialogId.value = item._id
    name.value.value = item.name
    price.value.value = item.price
    description.value.value = item.description
    category.value.value = item.category
    sell.value.value = item.sell
  } else {
    dialogId.value = ''
  }
  dialog.value = true
}

// 關閉對話框
const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}

// 打開確認刪除對話框
const openDialogRemove = (item) => {
  dialogId.value = item._id
  dialogRemove.value = true
}

// 關閉確認刪除對話框
const closeDialogRemove = () => {
  dialogRemove.value = false
}

// 分類
const categories = ['人氣商品', '期間限定', '經典口味', '新品上市']

// 表單驗證
const schema = yup.object({
  name: yup
    .string()
    .required('缺少商品名稱'),
  price: yup
    .number()
    .typeError('商品價格必須是數字')
    .required('缺少商品價格')
    .min(0, '價格不可小於 0'),
  description: yup
    .string()
    .required('缺少商品說明'),
  category: yup
    .string()
    .required('缺少商品分類')
    .test('isCategory', '商品分類錯誤', value => categories.includes(value)),
  sell: yup.boolean()
})
// handleSubmit => 處理表單送出時的事件
// isSubmitting => 判斷是否送出表單，如果表單正在送出中，則把表單停用
// resetForm => 對話框關閉後會重置表單，每次開始對話框都是一個新的表單
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false
  }
})
// 設定表單欄位
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')

const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  // 如果檔案有錯誤就不送出
  if (fileRecords.value > 0 && fileRecords.value[0].error) return
  // 如果是做新增但是檔案長度沒有任何東西就不送出
  if (dialogId.value === '' && fileRecords.value.length === 0) return
  try {
    // 建立 formData 物件
    // 使用 fd.append(欄位,值) 將資料放進去
    const fd = new FormData()

    for (const key in values) {
      fd.append(key, values[key])
    }

    if (fileRecords.value.length > 0) {
      // 原本單張圖的寫法
      // fd.append('image', fileRecords.value[0].file)
      // 多張圖寫法
      for (const file of fileRecords.value) {
        fd.append('images', file.file)
      }
    }

    // 判斷目前是新增還是編輯，對不同路徑發請求
    if (dialogId.value === '') {
      await apiAuth.post('/products', fd)
    } else {
      await apiAuth.patch('/products/' + dialogId.value, fd)
    }
    createSnackbar({
      // 如果現在是新增就顯示新增成功，否則顯示編輯成功
      text: dialogId.value === '' ? '新增成功' : '編輯成功',
      // 不要出現關閉的按鈕
      showCloseButton: false,
      // snackbarProps => vuetify的snackbar樣式
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    closeDialog()
    // 重新載入表格資料
    tableApplySearch()
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
// 刪除商品
const remove = async () => {
  try {
    await apiAuth.delete('/products/' + dialogId.value)
    createSnackbar({
      text: '刪除成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    closeDialogRemove()
    tableLoadItems() // 重新載入商品列表
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
}

// 表格
// 表格每頁幾個
const tableItemsPerPage = ref(10)
// 表格排序
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
// 表格頁碼
const tablePage = ref(1)
// 表格商品資料陣列
const tableProducts = ref([])
// 表格欄位設定
const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '名稱', align: 'center', sortable: true, key: 'name' },
  { title: '價格', align: 'center', sortable: true, key: 'price' },
  // { title: '說明', align: 'center', sortable: true, key: 'description' },
  { title: '分類', align: 'center', sortable: true, key: 'category' },
  { title: '上架', align: 'center', sortable: true, key: 'sell' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' },
  { title: '刪除', align: 'center', sortable: false, key: 'remove' }
]
// 表格載入狀態
const tableLoading = ref(true)
// 表格全部資料數
const tableItemsLength = ref(0)
// 表格搜尋文字
const tableSearch = ref('')
// 表格載入資料
const tableLoadItems = async () => {
  // 載入狀態
  tableLoading.value = true
  try {
    // .get( '網址', 請求的設定)
    // .post('網址', 送出的資料, 請求的設定)
    const { data } = await apiAuth.get('/products/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
        search: tableSearch.value
      }
    })
    tableProducts.value.splice(0, tableProducts.value.length, ...data.result.data)
    tableItemsLength.value = data.result.total
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
  tableLoading.value = false
}
tableLoadItems()

// 表格套用搜尋
const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}

</script>

<style>
span{
  font-weight: 700;
}
tr{
  font-size: 1rem;
}
</style>

<template>
  <div style="height: 100%;" class="bg-back">
    <VContainer>
      <VRow>
        <!-- ===== title -->
        <VCol cols="12">
          <h1 class="text-center mt-5 text-sixth">會員管理</h1>
        </VCol>
        <!-- ===== 會員列表 -->
        <VCol cols="12" >
          <VDataTableServer
            v-model:items-per-page="tableItemsPerPage"
            v-model:sort-by="tableSortBy"
            v-model:page="tablePage"
            :items="tableUsers"
            :headers="tableHeaders"
            :loading="tableLoading"
            :items-length="tableItemsLength"
            :search="tableSearch"
            @update:items-per-page="tableLoadItems"
            @update:sort-by="tableLoadItems"
            @update:page="tableLoadItems">
            <!-- === 上方插槽 放搜尋功能 -->
            <template #top>
              <VTextField label="搜尋" append-inner-icon="mdi-magnify" v-model="tableSearch" variant="underlined"
                @click:append-inner="tableApplySearch" @keydown.enter="tableApplySearch">
              </VTextField>
            </template>
              <!-- === 指定 avatar 欄位的顯示方式 -->
          <!-- [`item.key`]，插槽後面= 可以帶出它的資料，這裡解構出 key item -->
            <template #[`item.avatar`]="{ item }">
              <VAvatar size="30">
                <VImg :src="item.avatar" contain></VImg>
              </VAvatar>
            </template>
            <!-- === 指定 role 欄位的顯示方式 -->
            <template #[`item.role`]="{ item }">
              <VIcon icon="mdi-check" v-if="item.role === 1 " color="sixth"></VIcon>
            </template>
            <template #[`item.blacklist`]="{ item }">
              <VIcon icon="mdi-account-alert-outline" v-if="item.blacklist === true " color="seventh"></VIcon>
            </template>
            <!-- === 指定 edit 欄位的顯示方式 -->
            <template #[`item.edit`]="{ item }">
              <VBtn icon="mdi-pencil" variant="text" color="sixth" @click="openDialog(item)"></VBtn>
            </template>
            <!-- === 指定 remove 欄位的顯示方式 -->
            <template #[`item.remove`]="{ item }">
              <VBtn icon="mdi-delete" variant="text" color="seventh" @click="openDialogRemove(item)"></VBtn>
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
    </VContainer>

    <!-- ===== 刪除使用者確認視窗 -->
    <VDialog v-model="dialogRemove" width="300px">
      <VCard rounded="xl">
        <VIcon icon="mdi-alert-circle" color="seventh" size="50" class="ma-auto mt-5"></VIcon>
        <VCardText>確定要刪除「{{ account.value.value }}」嗎？ <br> 此動作無法復原！</VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="sixth" rounded @click="closeDialogRemove">取消</VBtn>
          <VBtn color="seventh" rounded @click="remove">確認刪除</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- ===== 編輯使用者 跳出的視窗 VDialog -->
    <VDialog v-model="dialog" persistent width="500px">
      <VForm :disabled="isSubmitting" @submit.prevent="submit">
        <VCard rounded="xl">
          <VCardTitle class="text-center mt-3 pb-0">編輯使用者權限</VCardTitle>

          <VCardText>
              <VRadioGroup v-model="role.value.value" :error-messages="role.errorMessage.value" inline>
                <VRadio label="一般會員" :value="0"></VRadio>
                <VRadio label="管理員" :value="1"></VRadio>
              </VRadioGroup>
              <VRadioGroup v-model="blacklist.value.value" :error-messages="blacklist.errorMessage.value" inline>
                <VRadio label="正常" :value="false"></VRadio>
                <VRadio label="異常" :value="true"></VRadio>
              </VRadioGroup>
              <v-textarea  label="異常原因" variant="outlined" density="compact" class="py-3"
              :disabled="disabled"
                v-model="blacklistReason.value.value" :error-messages="blacklistReason.errorMessage.value"
                ></v-textarea >
          </VCardText>

          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="sixth" rounded :disabled="isSubmitting" @click="closeDialog">取消</VBtn>
            <VBtn color="seventh" rounded type="submit" :loading="isSubmitting">送出</VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </VDialog>
  </div>
  </template>
  <!-- ------------------------------------------- -->
<script setup>
import { ref, computed } from 'vue'
// 表單驗證套件
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

/*
  1. 在 <VueFileAgent> 中宣告 ref 屬性 ref="fileAgent"
    2. 在 setup 中宣告 fileAgent，代表 VueFileAgent 元件
    3. 在 closeDialog() 關閉對話框時使用 fileAgent.value.deleteFileRecord() 重設上傳的檔案
    -> .deleteFileRecord() 是 VueFileAgent 內建的方法
    */
// ===== 重設 VueFileAgent 上傳的檔案用的
// const fileAgent = ref(null)

// ===== 表單對話框的開啟狀態
const dialog = ref(false)
const dialogRemove = ref(false)

// ===== 判斷表單對話框為新增或編輯
// 表單對話框正在編輯的使用者 ID，空的話代表是新增使用者
const dialogId = ref('')

// ===== 打開 新增or編輯對話框 function
const openDialog = (item) => {
  // 如果有 item，代表是編輯，就把目前 item 的資料放進表單
  if (item) {
    dialogId.value = item._id
    account.value.value = item.account
    // email.value.value = item.email
    role.value.value = item.role
    blacklist.value.value = item.blacklist
    blacklistReason.value.value = item.blacklistReason
  } else {
    // 如果沒有 item，代表是新增，就重置表單
    dialogId.value = ''
  }
  dialog.value = true
}

// ===== 關閉 新增or編輯對話框 function
const closeDialog = () => {
  dialog.value = false // 關閉對話框
  resetForm() // 重置表單
  // fileAgent.value.deleteFileRecord() // 重設上傳的檔案
}

// ===== 打開 確認刪除對話框 function
const openDialogRemove = (item) => {
  dialogId.value = item._id
  account.value.value = item.account
  dialogRemove.value = true
}

// ===== 關閉 確認刪除對話框 function
const closeDialogRemove = () => {
  dialogRemove.value = false
}
// ==================== 前端表單驗證 ====================
// === 定義表單驗證規則
const schema = yup.object({
  account: yup
    .string()
    .required('缺少使用者帳號')
    .typeError('信箱格式錯誤'),
  role: yup
    .number()
    .required('缺少使用者角色'),
  blacklist: yup
    .boolean()
    .required('缺少使用者黑名單'),
  blacklistReason: yup
    .string()
    .test('blacklistReason', '異常原因必填', (value) => {
      if (blacklist.value.value === 'false') {
        return false
      }
      return true
    }
    )
})
// === 先 useForm -> 表單驗證方式綁定 schema
const { handleSubmit, isSubmitting, resetForm } = useForm({ // handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出；resetForm 重置表單
  validationSchema: schema,
  // --- 初始值設定
  initialValues: {
    account: '',
    role: 0,
    blacklist: false,
    blacklistReason: ''
  }
})
// === 再 useField -> 建立表單欄位
// 讓表單欄位綁定到 schema 的規則
const account = useField('account')
// const email = useField('email')
const role = useField('role')
const blacklist = useField('blacklist')
const blacklistReason = useField('blacklistReason')
// === VueFileAgent 上傳檔案寫法
// const fileRecords = ref([])
// const rawFileRecords = ref([])
// ====================================================

// ===== 刪除使用者 function
const remove = async () => {
  try {
    await apiAuth.delete('/users/' + dialogId.value)
    createSnackbar({
      text: '刪除成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'forth',
        location: 'bottom'
      }
    })
    closeDialogRemove()
    tableLoadItems() // 重新載入使用者列表
  } catch (error) {
    console.log(error)
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

// ===== 編輯表單送出處理函式
const submit = handleSubmit(async (values) => { // values 是表單各個欄位的值
  // 如果 圖片上傳有錯誤，就不送出  // 沒上傳圖片就沒有 value[0]，value[0] 是 undefined，undefined 沒有 .error 所以要用 ?. 避免錯誤
  // if (fileRecords.value[0]?.error) return
  // 如果 新增商品時，沒有選擇圖片，就不送出（編輯商品時，可以不選擇圖片）
  // if (dialogId.value === '' && fileRecords.value.length === 0) return

  try {
    // === 檔案上傳要用 FormData 物件，不是一般的 JSON 物件
    // 建立 FormData 物件
    const fd = new FormData()
    // 使用 fd.append(欄位key, 值value) 將所有資料放進去，可以一個一個寫，這邊使用 for...in 取得 values 的所有 key
    for (const key in values) {
      fd.append(key, values[key])
    }
    // === 如果有選擇圖片，就放進 FormData
    // if (fileRecords.value.length > 0) {
    //   fd.append('image', fileRecords.value[0].file)
    // }
    // === 送出 FormData 物件的表單資料到後端
    // 如果 dialogId.value 有值，代表是編輯使用者，就用 .patch() 送出
    await apiAuth.patch('/users/' + dialogId.value, fd)
    // 成功通知
    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'forth',
        location: 'bottom'
      }
    })
    closeDialog()
    tableApplySearch() // 重新載入商品列表，而且回到第一頁 -> 剛好可以套用搜尋功能的重新載入
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    // 失敗通知
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

// ==================== VDataTableServer 使用者列表 ====================
// === 表格每頁幾個
const tableItemsPerPage = ref(10)
// === 表格排序
const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' } // 預設以建立時間倒序排列
])
// === 表格頁碼
const tablePage = ref(1)
// === 表格商品資料陣列 -> 用來顯示目前頁面在表格上
const tableUsers = ref([])
// === 表格欄位設定
// key 是後端回傳的資料 key，用 v-for 自動產生表格
const tableHeaders = [
  { title: '大頭貼', align: 'center', sortable: false, key: 'avatar' },
  { title: '帳號', align: 'center', sortable: true, key: 'account' },
  { title: '管理員', align: 'center', sortable: true, key: 'role' },
  { title: '狀態', align: 'center', sortable: true, key: 'blacklist' },
  { title: '異常原因', align: 'center', sortable: true, key: 'blacklistReason' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' }, // edit 資料庫中沒有這個欄位，自己新增的欄位
  { title: '刪除', align: 'center', sortable: false, key: 'remove' } // delete 資料庫中沒有這個欄位，自己新增的欄位
]
// === 表格載入狀態
const tableLoading = ref(true)
// === 表格全部資料數 -> 用來計算分頁數
const tableItemsLength = ref(0)
// === 表格搜尋文字
const tableSearch = ref('')

// ===== 表格重新載入資料函式，去後端撈資料
const tableLoadItems = async () => {
  // --- 載入時顯示載入中
  tableLoading.value = true
  try {
    // .get('請求網址', 送出的body(請求方式可以帶的話), 參數)
    const { data } = await apiAuth.get('/users/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
        search: tableSearch.value
      }
    })
    // --- 資料撈回來後，將資料放進 tableUsers
    tableUsers.value.splice(0, tableUsers.value.length, ...data.result.data)
    // --- 將全部資料數放進 tableItemsLength
    tableItemsLength.value = data.result.total
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤123，請稍後再試'
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
  // --- 載入完成後關閉載入中
  tableLoading.value = false
}
tableLoadItems()
// ==============================================================

// ===== 送出搜尋時 表格套用搜尋
const tableApplySearch = () => {
  // 回到第一頁資料
  tablePage.value = 1
  // 重新載入資料
  tableLoadItems()
}

const disabled = computed(() => {
  return !blacklist.value.value
})
</script>

  <!-- ------------------------------------------- -->
  <style lang="scss" scoped>
  </style>

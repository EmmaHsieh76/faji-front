<template>
  <VContainer>
    <VRow class="justify-center pt-10">
      <VCol cols="12" class="text-center" md="6" lg="6" >
        <VAvatar :image="user.avatar" size="260"
        ></VAvatar>
        <VBtn icon="mdi-pencil" size="x-small" color="third" style="vertical-align: bottom"  variant="tonal"
        @click="openDialog"
        ></VBtn>
        <h2 class="third">{{ user.account }}</h2>
      </VCol>
      <VCol cols="12" md="6" lg="6" >
          <VCard class="bg-eigth">
          <!-- 帳號 密碼 名字 手機 -->
            <VToolbar color="third" flat >
              <VIcon class="ps-8" icon="mdi-account" ></VIcon>
              <VToolbarTitle class="font-weight-bold">個人資料</VToolbarTitle>
              <VSpacer></VSpacer>
              <VBtn icon>
                <VFadeTransition leave-absolute>
                  <VIcon v-if="isEditing" @click="cancel" icon="mdi-close"  variant="tonal"></VIcon>
                  <VIcon v-else icon="mdi-pencil" @click="isEditing = true"  variant="tonal"></VIcon> 
                </VFadeTransition>
                
              </VBtn>
            </VToolbar>
            <VForm @submit.prevent="submit" :disabled=" !isEditing || isSubmitting">
              <!-- <VContainer>
                <h4>帳號</h4>
                <h4 color="forth" class="pb-3 mt-2">{{ account }}</h4>
                <VDivider></VDivider>
                <h4 class="mt-4">名字</h4>
                <VTextField
                  v-model="name"
                  color="forth"
                  variant="underlined"
                  clearable
                  placeholder="輸入您的名字"
                  :rules="[rules.required]"
                ></VTextField>
                <h4 class="mt-2">電話</h4>
                <VTextField
                  v-model="phone"
                  color="forth"
                  placeholder="輸入您的手機號碼"
                  variant="underlined"
                  clearable
                  :rules="[rules.required]"
                ></VTextField>

                <VBtn color="forth" size="x-large" class="font-weight-bold d-flex w-100"  variant="tonal"
                type="submit"
                @click="submit"
                >
                確認修改個人資料
                </VBtn>
              </VContainer> -->
              <VCardText class="pa-10">
                <VRow>
                  <VCol cols="12" class=pb-0 >
                    <VTextField
                    label="帳號"
                    variant="outlined"
                    density="comfortable"
                    v-model="account.value.value"
                    :error-messages="account.errorMessage.value"
                    ></VTextField>
                  </VCol>
                  <VCol cols="12" class=pb-0 >
                    <VTextField
                    label="姓名"
                    variant="outlined"
                    density="comfortable"
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    ></VTextField>
                  </VCol>
                  <VCol cols="12" class=pb-0 >
                    <VTextField
                    label="電話"
                    variant="outlined"
                    density="comfortable"
                    v-model="phone.value.value"
                    :error-messages="phone.errorMessage.value"
                    ></VTextField>
                  </VCol>
                </VRow>
              </VCardText>
              <VCardActions>
                <VBtn
                  color="third" size="x-large"
                  class="font-weight-bold d-flex w-100"  variant="tonal"
                  type="submit"
                  :loading="isSubmitting"
                  :disabled="!isEditing"
                >
                  確認修改個人資料
                </VBtn>
                <!-- <VBtn
                  color="error"
                  @click="cancel"
                  :disabled="isSubmitting"
                >
                  取消
                </VBtn> -->
              </VCardActions>
            </VForm>
          </VCard>
      </VCol>
    </VRow>
  </VContainer>
  <!-- 換大頭貼對話框 -->
  <VDialog v-model="dialogAvatar" width="300px">
    <VCard rounded="xl" class="px-5 pt-5">
      <VueFileAgent
      v-model="fileRecords"
      v-model:rawModelValue="rawFileRecords"
      accept="image/jpeg, image/png" max-size="1MB"
      :error-text="{type: '檔案格式不支援, 只接受 .jepg .png', size: '檔案大小超過 1MB'}"
      deletable help-text="選擇大頭貼圖片或拖曳到這裡"
      :max-files="1" ref="fileAgent"
      ></VueFileAgent>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn color="seventh" rounded
        @click="closeDialog" :disabled="avatarSubmiting"
        >取消</VBtn>
        <VBtn color="forth" rounded
        @click="editAvatar" :disabled="avatarSubmiting"
        >送出</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import validator from 'validator'
import * as yup from 'yup'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()

// ===== 會員資料編輯狀態
const isEditing = ref(false)

// ===== 重設 VueFileAgent 上傳的檔案用的
const fileAgent = ref(null)
// ===== 表單對話框的開啟狀態
const dialogAvatar = ref(false)

// ===== 打開 編輯 avatar 對話框 function
const openDialog = (item) => {
  dialogAvatar.value = true
}

// ===== 關閉 編輯 avatar 對話框 function
const closeDialog = () => {
  dialogAvatar.value = false // 關閉對話框
  fileAgent.value.deleteFileRecord() // 重設上傳的檔案
}

// 換頭貼送出中
const avatarSubmiting = ref(false)


// 表單驗證
const schema = yup.object({
  account: yup
    .string()
    .required('缺少使用者帳號')
    // .test(自訂驗證名稱, 錯誤訊息, 驗證function)
    .test('isEmail', '信箱格式錯誤', (value) => {
      return validator.isEmail(value)
    }),
  name: yup
    .string()
    .required('缺少使用者名稱'),
  phone: yup
    .string(),
})

//  === 先 useForm -> 表單驗證方式綁定 schema
const { handleSubmit, isSubmitting } = useForm({ // handleSubmit 表單送出時的處理函式；isSubmitting 是否正在送出；resetForm 重置表單
  validationSchema: schema,
  // --- 初始值設定
  initialValues: {
    account: '',
    name: '',
    phone: '',
  }
})

// === 再 useField -> 建立表單欄位
// 讓表單欄位綁定到 schema 的規則
const account = useField('account')
// const password = useField('password')
const name = useField('name')
const phone = useField('phone')

// 一開始就把 user 的資料放進表單
account.value.value = user.account
name.value.value = user.name
phone.value.value = user.phone


// ===== 取消編輯會員資料
const cancel = () => {
  // 重置表單成原本 pinia 的值
  account.value.value = user.account
  name.value.value = user.name
  phone.value.value = user.phone
  isEditing.value = false
}

// ===== 送出會員資料
const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.patch('/users/self', values) // values 是表單的資料
    // 更新 user store 的資料
    user.getProfile()

    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'third',
        location: 'center'
      }
    })
    isEditing.value = false
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'seventh',
        location: 'center'
      }
    })
  }
})

// ===== VueFileAgent 上傳檔案寫法
const fileRecords = ref([])
const rawFileRecords = ref([])

// ===== 編輯大頭貼
const editAvatar = async () => {
  // 防止重複送出
  avatarSubmiting.value = true

  // 如果 圖片上傳有錯誤，就不送出  // 沒上傳圖片就沒有 value[0]，value[0] 是 undefined，undefined 沒有 .error 所以要用 ?. 避免錯誤
  if (fileRecords.value[0]?.error) return
  try {
    const fd = new FormData()

    // === 如果有選擇圖片，就放進 FormData
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    await apiAuth.patch('/users/avatar', fd)

    // 更新 user store 的 avatar
    user.getProfile()

    createSnackbar({
      text: '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'third',
        location: 'bottom'
      }
    })
    closeDialog()
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
  // 防止重複送出
  avatarSubmiting.value = false
}


</script>



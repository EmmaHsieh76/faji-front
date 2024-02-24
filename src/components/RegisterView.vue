<template>
  <v-card
  class="pa-sm-16 py-sm-12 pa-8 py-2"
  rounded="lg">
    <v-row>
      <v-col cols="12">
        <!-- :disabled="isSubmitting"=>表單送出時，停用整個表單 -->
        <!--  @submit.prevent="submit" => 送出後，停止預設的跳頁動作並執行submit的function -->
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
          label="帳號" type="email" class="mb-3"
          placeholder="a123456@gmail.com"
          v-model="account.value.value"
          :error-messages="account.errorMessage.value"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          hint="帳號為信箱格式"
          ></v-text-field>
          <v-text-field
          label="密碼" type="password" class="mb-3"
          minlength="4" maxlength="20" counter
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          hint="密碼長度至少 4 個字，最多 20 個字"
          ></v-text-field>
          <v-text-field
          label="確認密碼" type="password" class="mb-3"
          minlength="4" maxlength="20" counter
          v-model="passwordConfirm.value.value"
          :error-messages="passwordConfirm.errorMessage.value"
          prepend-inner-icon="mdi-lock-alert-outline"
          variant="outlined"
          hint="確認密碼和密碼必須一致"
          ></v-text-field>
          <v-text-field
          label="姓名" type="text" class="mb-3"
          placeholder="王小明"
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
          prepend-inner-icon="mdi-account-circle-outline"
          variant="outlined"
          ></v-text-field>
          <v-text-field
          label="手機號碼" type="tel" class="mb-3"
          placeholder="0912345678"
          v-model="phone.value.value"
          :error-messages="phone.errorMessage.value"
          prepend-inner-icon="mdi-cellphone"
          variant="outlined"
          ></v-text-field>
          <v-btn
          type="submit"
          color="yellow-darken-4"
          block
          size="large"
          class="font-weight-bold"
          variant="tonal">註冊</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
// 表單驗證套件
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// useRouter=>對路由做操作ex:跳轉頁面，useRoute=>取路由的資訊
// import { useRouter } from 'vue-router'
// useSnackbar=>彈出提示訊息
import { useSnackbar } from 'vuetify-use-dialog'
// useApi => axios的路徑baseURL
import { useApi } from '@/composables/axios'

const { api } = useApi()

// const router = useRouter()
const createSnackbar = useSnackbar()

// 定義註冊表單資料格式 => 表單驗證
const schema = yup.object({
  account: yup
    .string()
    .required('帳號為信箱格式且必填欄位')
    // .test(自定測試名稱, 錯誤訊息, 驗證函式)
    .test('isAccount', '格式錯誤', (value) => {
      return validator.isEmail(value)
    }),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度至少 4 個字')
    .max(20, '密碼長度最多 20 個字'),
  passwordConfirm: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度至少 4 個字')
    .max(20, '密碼長度最多 20 個字')
    // .oneof() => 只允許符合陣列內其中一個值
    // .ref('password') => 這個 schema 的 password 欄位值
    .oneOf([yup.ref('password')], '密碼與確認密碼不相符'),
  name: yup
    .string()
    .required('姓名為必填欄位'),
  phone: yup
    .string()
    .required('手機號碼為必填欄位')
    .test('isPhone', '手機號碼格式錯誤', (value) => {
      return validator.isMobilePhone(value, 'zh-TW')
    })
})
// handleSubmit => 表單送出函式 ex把表單送給後端
// isSubmitting => 是否正在送出表單 ex送出表單時，避免重複送出，可以去做設定
const { handleSubmit, isSubmitting } = useForm({
  // 表單綁定上面定義的 schema => 表單驗證方式為上面的schma
  validationSchema: schema
})
// useField => 取得表單欄位資料,  useField() 內的值要對應到上面schema的欄位名稱 ex=> account: yup => useField('account')
const account = useField('account')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')
const name = useField('name')
const phone = useField('phone')
const emit = defineEmits([''])

// 表單送出跟useform做綁定
// values => 表單內所有欄位的值
const submit = handleSubmit(async (values) => {
  try {
    // post('baseURL後接的相對路徑',要送出的資料)
    await api.post('/users', {
      account: values.account,
      password: values.password,
      name: values.name,
      phone: values.phone
    })
    emit('submit-form')
    // 送出表單，註冊成功後，跳出提示訊息
    createSnackbar({
      text: '註冊成功',
      // 不要出現關閉的按鈕
      showCloseButton: false,
      // snackbarProps => vuetify的snackbar屬性
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    // 註冊成功後，跳轉到登入頁面
    // router.push('/login')
  } catch (error) {
    // 如果是 axios 的錯誤，會有 response，有可能請求回應沒有內容，所以要加上 ? 避免錯誤
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

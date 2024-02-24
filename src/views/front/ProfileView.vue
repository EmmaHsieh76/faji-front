<template>
  <v-row>
    <v-col cols="12">
        <h2 class="text-center">修改個人資料</h2>
      </v-col>
    <v-col cols="12" md="6">
     <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card
        class="mx-auto"
        max-width="344"
      >
      <!-- 帳號 密碼 名字 手機 -->
      <v-card-title class="third font-weight-bold text-center" >個人基本資料</v-card-title>
        <v-container>
          <h4>帳號</h4>
          <h4 color="forth" class="pb-4">{{ account }}</h4>
          <v-text-field
            v-model="name"
            color="forth"
            label="名字"
            variant="underlined"
            clearable
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            v-model="phone"
            color="forth"
            label="手機"
            placeholder="Enter your password"
            variant="underlined"
            clearable
            :rules="[rules.required]"
          ></v-text-field>

        </v-container>

          <v-btn color="forth" size="x-large" class="font-weight-bold d-flex w-100"  variant="tonal" 
          type="submit"
          :isSubmitting="isSubmitting"
          >
          確認修改個人資料
          </v-btn>

      </v-card>
     </v-form>
    </v-col>
    <v-col cols="12" md="6">
      <v-form>
        <v-card
          class="mx-auto"
          max-width="344"
        >
    <!-- 帳號 密碼 名字 手機 -->
    <v-card-title class="third font-weight-bold text-center" >修改密碼</v-card-title>
      <v-container>
        <v-text-field
          v-model="password"
          color="forth"
          label="舊密碼"
          variant="underlined"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="password"
          color="forth"
          label="輸入新密碼"
          variant="underlined"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="password"
          color="forth"
          label="確認新密碼"
          variant="underlined"
          clearable
        ></v-text-field>
      </v-container>
        <v-btn color="forth" size='x-large' class="font-weight-bold d-flex w-100" block variant="tonal">
        確認修改密碼
        </v-btn>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()

// 預設 帳號 密碼 名字 手機為會員資料
const account = ref('')
const password = ref('')
const name = ref('')
const phone = ref('')
const newPassword = ref('')

name.value = user.name
phone.value = user.phone
account.value = user.account
password.value = user.password

// 規則
const rules = ref({
  required: value => !!value || '必填欄位'
})

// 提交修改個人資料，按鈕不能按
const isSubmitting = ref(false)
const submit = async () => {
  isSubmitting.value = true
  try {
    await apiAuth.patch('/users', {
      name: name.value,
      phone: phone.value
    })
    createSnackbar({
      text: '更新成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
  } catch (error) {
    console.error(error)
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
// isSubmitting.value = false
</script>

<style scoped>
.third{
  color:#F9C80E;
}
</style>

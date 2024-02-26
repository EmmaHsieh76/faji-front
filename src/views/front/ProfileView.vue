<template>
  <v-row>
    <v-col cols="12">
        <h2 class="text-center">修改個人資料</h2>
      </v-col>
    <v-col cols="12">
     <v-form @submit.prevent="submit">
      <v-card
        class="mx-auto"
        max-width="344"
      >
      <!-- 帳號 密碼 名字 手機 -->
      <v-card-title class="third font-weight-bold text-center" >個人基本資料</v-card-title>
        <v-container>
          <h4>帳號</h4>
          <h4 color="forth" class="pb-3 mt-2">{{ account }}</h4>
          <v-divider></v-divider>
          <h4 class="mt-4">名字</h4>
          <v-text-field
            v-model="name"
            color="forth"
            variant="underlined"
            clearable
            placeholder="輸入您的名字"
            :rules="[rules.required]"
          ></v-text-field>
          <h4 class="mt-2">電話</h4>
          <v-text-field
            v-model="phone"
            color="forth"
            placeholder="輸入您的手機號碼"
            variant="underlined"
            clearable
            :rules="[rules.required]"
          ></v-text-field>

        </v-container>

          <v-btn color="forth" size="x-large" class="font-weight-bold d-flex w-100"  variant="tonal"
          type="submit"
          @click="submit"
          >
          確認修改個人資料
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
// const password = ref('')
const name = ref('')
const phone = ref('')

account.value = user.account
// password.value = user.password
name.value = user.name
phone.value = user.phone

// 規則
const rules = ref({
  required: value => !!value || '必填欄位'
})

// 提交修改個人資料，按鈕不能按
// const isSubmitting = ref(false)
const submit = async () => {
  const values = {
    account: account.value,
    name: name.value,
    phone: phone.value
  }

  try {
    await apiAuth.patch('/users/user/' + user._id, values)
    user.login(values)
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

</script>

<style scoped>
.third{
  color:#F9C80E;
}
</style>

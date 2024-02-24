<!-- eslint-disable semi -->
<template>
  <v-card class="mx-auto my-0 my-sm-6" max-width="500"  elevation="4">
    <v-tabs
      v-model="tab"
      color="forth"
      align-tabs="center"
      fixed-tabs
    >
      <v-tab :value="1" class="font-weight-black"><v-icon>mdi-login</v-icon>登入</v-tab>
      <v-tab :value="2"><v-icon>mdi-account-plus-outline</v-icon>註冊</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container fluid>
          <LoginView></LoginView>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid>
          <RegisterView @submit-form="shift"></RegisterView>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import RegisterView from '@/components/RegisterView.vue'
import LoginView from '@/components/LoginView.vue'

const tab = ref(1)

const shift = () => {
  tab.value = 1
}

</script>

<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="12" md="3" class="d-flex justify-center">
        <v-card
          min-width="230"
        >
          <v-list>
            <v-list-subheader class="font-weight-bold">會員中心</v-list-subheader>
            <v-divider></v-divider>
            <v-list-item
              v-for="item in items"
              :key="item.to"
              :to="item.to"
              :value="item"
              color="third"
              rounded="xl"
              exact
            >
            <v-list-item-title class="ps-5 font-weight-bold"
            >{{item.text}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="9" >
          <router-view :key="$route.path" ></router-view>
      </v-col>
  </v-row>
  </v-container>
</template>

<script setup>

import { computed } from 'vue'
import { useUserStore } from '@/store/user'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const user = useUserStore()
const items = computed(() => {
  return [
    { text: '訂單管理', to: '/member'},
    { text: '修改個人資料', to: '/member/profile' }
  ]
})

</script>

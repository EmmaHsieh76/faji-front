<template>
<v-container>
    <v-row class="mt-5">
      <v-col cols="3" class="d-flex justify-center">
        <v-card
          min-width="200"
        >
          <v-list>
            <v-list-subheader>會員中心</v-list-subheader>
            <v-divider></v-divider>
            <v-list-item
              v-for="item in items"
              :key="item.to"
              :to="item.to"
              :value="item"
              color="third"
              rounded="xl"
            >
            <v-list-item-title class="ps-5"
            >{{item.text}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
          <router-view :key="$route.path" ></router-view>
      </v-col>
  </v-row>
  </v-container>
</template>

<script setup>

import { computed } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

const items = computed(() => {
  return [
    { text: '訂單管理', to: '/member/orders' },
    { text: '修改個人資料', to: '/member/profile' }
  ]
})

</script>

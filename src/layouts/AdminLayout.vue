<template>
<v-navigation-drawer permanent>
  <v-list>
    <v-list-item :prepend-avatar="user.avatar" :title="user.account">
    </v-list-item>
  </v-list>
  <v-divider></v-divider>
  <v-list>
    <v-list-item v-for="item in navItems" :key="item.to" :title="item.text" :prepend-icon="item.icon" :to="item.to"
    ></v-list-item>
  </v-list>
</v-navigation-drawer>
<v-main>
  <router-view />
</v-main>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'

const user = useUserStore()

const navItems = [
  { to: '/admin/products', text: '商品管理', icon: 'mdi-store' },
  { to: '/admin/orders', text: '訂單管理', icon: 'mdi-list-box' },
  { to: '/admin/members', text: '會員管理', icon: 'mdi-account' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]


</script>
<style scoped>
.about-view {
  text-align: center;
  margin-top: 50px;
}
</style>

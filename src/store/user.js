// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import { useApi } from '@/composables/axios'

export const useUserStore = defineStore('user', () => {
  const { apiAuth } = useApi()
  // 使用者要保存的資料
  const token = ref('')
  const _id = ref('')
  const account = ref('')
  const cart = ref(0)
  const name = ref('')
  const phone = ref('')
  const blacklist = ref(false)
  const blacklistReason = ref('')
  const role = ref(UserRole.USER)

  // 讓上面資訊可以傳入ref裡面
  const login = (data) => {
    // 重整頁面後token不會消失
    if (data.token) {
      token.value = data.token
    }
    _id.value = data._id
    account.value = data.account
    cart.value = data.cart
    name.value = data.name
    phone.value = data.phone
    blacklist.value = data.blacklist
    blacklistReason.value = data.blacklistReason
    role.value = data.role
  }

  // 判斷是否登入，來讓頁面顯示不同的內容
  const isLogin = computed(() => {
    return token.value.length > 0
  })

  // 判斷是否為管理員
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  const getProfile = async () => {
    if (token.value.length === 0) return

    try {
      // '/users/me'是後端的routes/users.js裡面的router.get('/me', auth.jwt, getProfile)
      const { data } = await apiAuth.get('/users/me')
      login(data.result)
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    token.value = ''
    _id.value = ''
    account.value = ''
    cart.value = 0
    name.value = ''
    phone.value = ''
    blacklist.value = false
    blacklistReason.value = ''
    role.value = UserRole.USER
  }

  return {
    token,
    _id,
    account,
    cart,
    name,
    phone,
    blacklist,
    blacklistReason,
    role,
    login,
    logout,
    isLogin,
    isAdmin,
    getProfile
  }
}, {
  // pinia要保存在localStorage裡面的狀態，登入後重新整理頁面還是會保留登入狀態
  persist: {
    key: 'faji',
    paths: ['token']
  }
})

// Composables
// START_LOCATION => 第一次進到頁面的跳轉
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    // 首頁
    path: '/',
    // 預設的前端元件
    component: () => import('@/layouts/FrontLayout.vue'),
    // layout裡的所有頁面
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: '發記冰品',
          // 不用登入就可以看到這頁面
          login: false,
          // 不用是管理員就可以看到這頁面
          admin: false
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/front/AboutView.vue'),
        meta: {
          title: '發記冰品 | 關於我們',
          login: false,
          admin: false
        }
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('@/views/front/NewsView.vue'),
        meta: {
          title: '發記冰品 | 最新消息',
          login: false,
          admin: false
        }
      },
      {
        path: 'introduce',
        name: 'Introduce',
        component: () => import('@/views/front/IntroduceView.vue'),
        meta: {
          title: '發記冰品 | 冰品介紹',
          login: false,
          admin: false
        }
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/front/ProductView.vue'),
        meta: {
          title: '發記冰品 | 快速預訂',
          login: false,
          admin: false
        }
      },
      {
        path: 'content',
        name: 'Content',
        component: () => import('@/views/front/ContentView.vue'),
        meta: {
          title: '發記冰品 | 關於我們',
          login: false,
          admin: false
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/front/CartView.vue'),
        meta: {
          title: '發記冰品 | 我的購物車',
          login: true,
          admin: false
        }
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('@/views/front/SignUp.vue'),
        meta: {
          title: '發記冰品 | 註冊登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'products/:id',
        name: 'ProductDetail',
        component: () => import('@/views/front/ProductDetail.vue'),
        meta: {
          title: '發記冰品 | 商品詳細資訊',
          login: false,
          admin: false
        }
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/layouts/MemberView.vue'),
        meta: {
          title: '發記冰品 | 會員專區',
          login: true,
          admin: false
        },
        children: [
          {
            path: '',
            name: 'Orders',
            component: () => import('@/views/front/OrdersView.vue'),
            meta: {
              title: '發記冰品 | 訂單查詢',
              login: true,
              admin: false
            }
          },
          {
            path: 'profile',
            name: 'Profile',
            component: () => import('@/views/front/ProfileView.vue'),
            meta: {
              title: '發記冰品 | 修改個人資料',
              login: true,
              admin: false
            }
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: '發記冰品 | 後台管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductsView.vue'),
        meta: {
          title: '發記冰品 | 後台商品管理',
          login: true,
          admin: true

        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/OrdersView.vue'),
        meta: {
          title: '發記冰品 | 後台訂單管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'members',
        name: 'AdminMembers',
        component: () => import('@/views/admin/MembersView.vue'),
        meta: {
          title: '發記冰品 | 後台會員管理',
          login: true,
          admin: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 進到每個頁面後都會改變瀏覽器的標題
router.afterEach((to, from) => {
  document.title = to.meta.title
})

// ------- 進到每個頁面前-------------
// to是要去的頁面
// from是從哪個頁面來
// next是要去的頁面，重新導向
// userstore去取得當下狀態
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  // 如果是第一次進到頁面，就會去取得使用者的資料
  if (from === START_LOCATION) {
    await user.getProfile()
  }

  if (user.isLogin && ['/signup'].includes(to.path)) {
    // 如果使用者是登入狀態而且要去的路徑是註冊登入頁，就會重新導向到首頁
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    // 如果去的地方要登入但是使用者沒有登入，就會重新導向到登入頁
    next('/signup')
  } else if (to.meta.admin && !user.isAdmin) {
    // 如果去的地方要是管理員但是使用者不是管理員，就會重新導向到首頁
    next('/')
  } else {
    // 不導向到其他頁面
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const PageHome = () => import('../views/home.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: PageHome,
    meta: {
      title: '首页',
      scene: 1,
      auth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.el = to.hash
      position.behavior = 'smooth'
    }

    if (to.matched.some(m => m.meta.scrollToTop)) {
    // cords will be used if no selector is provided,
    // or if the selector didn't match any element.
      position.left = 0
      position.top = 0
    }

    if (!Object.keys(position).length) {
      position.left = 0
      position.top = 0
    }

    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = createRouter({
  history: createWebHistory('/'),
  scrollBehavior,
  routes
})

// 初次进入项目的时候预先执行的事件 - 获取登录态和权限信息
router.beforeResolve(async (to, from) => {

})

router.afterEach(async (to, from) => {
  // let title = to.meta.title
  // document.title = `${title}`
})

export default router
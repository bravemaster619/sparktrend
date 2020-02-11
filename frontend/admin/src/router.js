import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export const router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import(/* webpackChunkName: "demo" */ './views/Users.vue')
        },
        {
          path: '/products',
          name: 'products',
          component: () => import(/* webpackChunkName: "demo" */ './views/Products.vue')
        },
        {
          path: '/products/:id',
          name: 'edit product',
          component: () => import('./views/EditProduct.vue')
        },
        {
          path: '/users/:id',
          name: 'edit user',
          component: () => import('./views/EditUser.vue')
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import('./views/Orders.vue')
        },
        {
          path: '/orders/:id',
          name: 'edit orders',
          component: () => import('./views/EditOrder.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import(/* webpackChunkName: "demo" */ './views/Settings.vue')
        },

      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/logout',
          name: 'logout',
          redirect: '/login',
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(!to.matched.length || to.matched[to.matched.length - 1].path !== "/login") {
    const currentUser = JSON.parse(localStorage.getItem('sparktrend-user'))
    if (!currentUser || !currentUser.user || !currentUser.user.is_admin) {
      return next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
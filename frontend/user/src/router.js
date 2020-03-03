import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Browse from "./views/Browse";
import Checkout from "./views/Checkout";

import Overview from "./views/dashboard/Overview";
import AppBody from "./layout/AppBody";
import Product from "./views/Product";
import Purchases from "./views/dashboard/Purchases";
import TermsOfService from "./views/TermsOfService";
import PrivacyPolicy from "./views/PrivacyPolicy";
import MyProducts from "./views/dashboard/MyProducts";
import AddProduct from "./views/dashboard/AddProduct";
import BuyerGuide from "./views/BuyerGuide";
import SellerGuide from "./views/SellerGuide";
import ChangePassword from "./views/ChangePassword";
import MySales from "./views/dashboard/MySales";
import PageNotFound from "./views/PageNotFound"
import ServerError from "./views/ServerError";
import ManageProduct from "./views/dashboard/ManageProduct";
import Verify from './views/Verify'
Vue.use(Router);

export const router = new Router({
   linkExactActiveClass: "active",
   mode: "history",
   routes: [
      {
         path: "/",
         name: 'landing',
         components: {
            header: AppHeader,
            default: Landing,
            footer: AppFooter
         }
      },
      {
         path: "/login",
         name: "login",
         components: {
            header: AppHeader,
            default: Login,
            footer: AppFooter
         }
      },
      {
         path: "/register",
         name: "register",
         components: {
            header: AppHeader,
            default: Register,
            footer: AppFooter
         }
      },
      {
         path: '/buyerguide',
         name: 'buyerguide',
         components: {
            header: AppHeader,
            default: BuyerGuide,
            footer: AppFooter
         }
      },
      {
         path: '/sellerguide',
         name: 'sellerguide',
         components: {
            header: AppHeader,
            default: SellerGuide,
            footer: AppFooter
         }
      },

      {
         path: '/',
         name: 'main',
         components: {
            header: AppHeader,
            default: AppBody,
            footer: AppFooter
         },
         children: [
            {
               path: '/browse',
               name: 'browse',
               component: Browse
            },
            {
               path: '/profile',
               name: 'profile',
               component: Profile,
               meta: {
                  requiresAuth: true
               }
            },
            {
               path: '/myproducts',
               name: 'myproducts',
               component: MyProducts,
               meta: {
                  requiresAuth: true
               }
            },
            {
               path: '/myproducts/:id',
               name: 'manage_product',
               component: ManageProduct,
               meta: {
                  requiresAuth: true
               }
            },
            {
               path: '/dashboard/main',
               name: 'dashboard_main',
               component: Overview,
               meta: {
                  requiresAuth: true
               }
            },
            {
               path: 'myorders/purchases',
               name: 'dashboard_purchase',
               component: Purchases,
               meta: {
                  requiresAuth: true
               }
            },
            {
               path: '/products/:id',
               name: 'product',
               component: Product
            },
            {
               path: '/orders/:id/checkout',
               name: 'checkout',
               component: Checkout,
               meta: {
                  requiresAuth: true
               }
            },
            {
               path: '/terms',
               name: 'tos',
               component: TermsOfService
            },
            {
               path: '/policy',
               name: 'policy',
               component: PrivacyPolicy
            },

            {
               path: '/addproduct',
               name: 'addproduct',
               component: AddProduct,
               meta: {
                  requiresAuth: true
               }
            },
            {
               path: '/changepassword',
               name: 'change_password',
               component: ChangePassword,
               meta: {
                  requiresAuth: true
               }
            },
            {
               path: '/myorders/sales',
               name: 'mysales',
               component: MySales,
               meta: {
                  requiresAuth: true
               }
            },
            {
              path: '/auth/verify',
              name: 'verify',
              component: Verify,
            },
            {
               path: '/404',
               name: '404',
               component: PageNotFound
            },
            {
               path: '/500',
               name: '500',
               component: ServerError
            },
            {
               path: '*',
               component: PageNotFound
            }
         ]
      },

   ],
   scrollBehavior: to => {
      if (to.hash) {
         return {selector: to.hash};
      } else {
         return {x: 0, y: 0};
      }
   },
});

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record && record.meta.requiresAuth)) {
      const loggedIn = localStorage.getItem("sparktrend-user")
      if (!loggedIn) {
         return next({
            path: '/login',
            params: {nextUrl: to.fullPath}
         })
      } else {
         next()
      }
   } else {
      next()
   }
})

export default router
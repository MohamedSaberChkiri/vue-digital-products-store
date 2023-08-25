import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import UserProfile from '../views/UserProfile.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children : [

      {path : '/featured',
      name : 'featured',
     component : ()=> import ('../components/FeaturedView.vue')
    },
    {
      path: '/latest',
      name :'latest',
      component : () => import ('../components/LatestView.vue')
    },
    {
      path: '/trending',
      name : 'trending',
      component : () => import ('../components/TrendingView.vue')
    }

    ]
  },
  {
    path :'/cart',
    name : 'cart',
    component : CartView
  },
  
  {
    path :'/checkout',
    name : 'checkout',
    component : CheckoutView
  },
  {
    path : '/login',
    name :'login',
    component : LoginView
  },{
    path : '/product',
    name :'productDetail',
    component : ProductDetails
  },
  {
    path : '/user',
    name :'user',
    component : UserProfile,
    children : [
      {
        path: '/user/PersonalDetails',
        name :'pd',
        component : ()=> import('../components/userlinkscomponents/PersonalDetails.vue')
      },
      {
        path : '/user/ChangePassword',
        name : 'cp',
        component : ()=> import('../components/userlinkscomponents/ChangePassword.vue')
      },
      {
        path : '/user/PaymentMethod',
        name : 'pm',
        component : ()=> import('../components/userlinkscomponents/PaymentMethods.vue'),
        children: [
          {
            path:'/user/PaymentMethod/card',
            component : ()=> import('../components/userlinkscomponents/paymentmethods/ByCard.vue')
          },
          {
            path:'/user/PaymentMethod/paypal',
            component : ()=> import('../components/userlinkscomponents/paymentmethods/ByPaypal.vue')
          },
          {
            path:'/user/PaymentMethod/bank',
            component : ()=> import('../components/userlinkscomponents/paymentmethods/ByBank.vue')
          }
        ]
      },
      {
        path : '/user/myProducts',
        name : 'mp',
        component : ()=> import('../components/userlinkscomponents/MyProducts.vue')
      }
    ]
  },
  {
    path : '/register',
    name : 'register',
    component : RegisterView
  },
  {
    path: '/:id',
    name :'sp',
    component : () => import ('../views/ProductDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

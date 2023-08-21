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
    component : UserProfile
  },
  {
    path : '/register',
    name : 'register',
    component : RegisterView
  },
  {
    path: '/product/:id',
    name :'sp',
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import UserProfile from '../views/UserProfile.vue'
import RegisterView from '../views/RegisterView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    props: true,
    component: HomeView,
    children : [

      {path : '/featured',
      name : 'featured',
     component : ()=> import ('../components/FeaturedView.vue'),
     props: true
    },
    {
      path: '/latest',
      name :'latest',
      component : () => import ('../components/LatestView.vue'),
      props: true
    },
    {
      path: '/trending',
      name : 'trending',
      component : () => import ('../components/TrendingView.vue'),
      props: true
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
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters.isAuthenticated; // Use the isAuthenticated getter
      if (isAuthenticated) {
        next(); // Allow access to the route
      } else {
        next('/login'); // Redirect to the login page
      }
    }
  ,
    children : [
      {
        path: '/user/PersonalDetails',
        name :'pd',
        component : ()=> import('../components/userlinkscomponents/PersonalDetails.vue'),
        props : true
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
        component : ()=> import('../components/userlinkscomponents/MyProducts.vue'),
        props : true
        
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

// Add a navigation guard to prevent back navigation to /user after logout
// Server-Side Logout
// When the user logs out, send a request to invalidate the session/token on the server
// This step ensures that server-side access control is maintained

// Client-Side Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  // If user is not authenticated and trying to access a restricted route
  if (!isAuthenticated && to.path === '/user') {
    // Redirect to login page
    next('/login');
  } else {
    // Continue with navigation
    next();
  }
});


export default router

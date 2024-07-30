import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ]
});

// router.beforeEach(async (to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     try {
//       const response = await axios.get('http://localhost:3000/api/user-info', { withCredentials: true });
//       if (response.data.user) {
//         next();
//       } else {
//         next('/login');
//       }
//     } catch (error) {
//       next('/login');
//     }
//   } else {
//     next();
//   }
// });

export default router

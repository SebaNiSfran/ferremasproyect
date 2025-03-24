import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';  
import CatalogoView from '../views/CatalogoView.vue';
import AdminView from '../views/AdminView.vue';
import ClienteView from '../views/ClienteView.vue';  // Importa la vista del cliente
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Ruta raíz
      redirect: '/login' 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: CatalogoView,
      meta: { requiresAuth: true, role: 'vendedor' }  // Definir qué roles necesitan estar logueados
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/cliente',  
      name: 'cliente',
      component: ClienteView,
      meta: { requiresAuth: true, role: 'cliente' }  // Definir que solo los clientes pueden acceder
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

// Guard para proteger las rutas que necesitan autenticación
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('loggedIn');
  const userRole = localStorage.getItem('userRole');
  
  // Si la ruta requiere autenticación y el usuario no está logueado
  if (to.meta.requiresAuth && !loggedIn) {
    next('/login');  // Redirigir al login
  } else if (to.meta.role && to.meta.role !== userRole) {
    // Si el rol no coincide con la ruta, redirigir a la página correspondiente
    next(`/${userRole}`);
  } else {
    next();  // Continua normalmente
  }
});

export default router;

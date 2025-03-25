import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';  
import CatalogoView from '../views/CatalogoView.vue';
import AdminView from '../views/AdminView.vue';
import ClienteView from '../views/ClienteView.vue';
import BodegueroView from '../views/BodegueroView.vue';
import ContadorView from '../views/ContadorView.vue';
import CarritoView from '../views/CarritoView.vue';  // Importa la vista de carrito
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
      meta: { requiresAuth: true, role: 'vendedor' }
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
      meta: { requiresAuth: true, role: 'cliente' }
    },
    {
      path: '/bodeguero',
      name: 'bodeguero',
      component: BodegueroView,
      meta: { requiresAuth: true, role: 'bodeguero' }
    },
    {
      path: '/contador',
      name: 'contador',
      component: ContadorView,
      meta: { requiresAuth: true, role: 'contador' } 
    },
    {
      path: '/carrito',  // Nueva ruta para carrito
      name: 'carrito',
      component: CarritoView,
      meta: { requiresAuth: true }  // Opcional: requiere autenticación
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
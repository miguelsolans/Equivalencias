import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login'),

    },
    {
        path: '/dashboard',
        name: 'ListaProcessos',
        component: () => import('../views/Dashboard'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/student',
        name: 'Student',
        component: () => import ('../views/Student'),
        meta: {
            requiresAuth: true
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

/**
 * Navigation Guards
 */
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(VueCookies.get('userToken') === null || localStorage.getItem('user') === undefined) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
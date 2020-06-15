import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';
import Store from '@/store'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login'),
        meta: {
            title: 'Login'
        }

    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard'),
        meta: {
            requiresAuth: true,
            title: 'Mantis'
        }
    },
    {
        path: '/process/:id',
        name: 'process',
        component: () => import('../views/Student'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/Settings'),
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
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (VueCookies.get('userToken') === null) {
            Store.dispatch('auth/logout');

            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
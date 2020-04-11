import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login';
import ListaProcessos from '../components/ListaProcessos';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,

    },
    {
        path: '/dashboard',
        name: 'ListaProcessos',
        component: ListaProcessos,
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
        if(localStorage.getItem('userToken') === null || localStorage.getItem('userToken') === undefined) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
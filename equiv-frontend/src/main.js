import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies';
import VueSweetAlert2 from 'vue-sweetalert2';

Vue.use(VueCookies);
Vue.use(VueSweetAlert2);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app');

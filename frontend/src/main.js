import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

Vue.use(VueCookies);
Vue.use(VueSweetAlert2);
Vue.use(require('vue-moment'));

library.add(faSignInAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app');

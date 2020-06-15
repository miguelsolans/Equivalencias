/**
 * Auth Service: Authentication Service
 * TODO: Replace axios with Fetch
 */

import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {

    login: (user) => {
        return axios.post(`${process.env.VUE_APP_API_SERVER}/user/login`, {
            username: user.username,
            password: user.password
        }).then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                VueCookies.set('userToken', response.data.token, "1h");
            }

            return response.data;
        });
    },

    logout: () => {
        localStorage.removeItem('user');
        VueCookies.remove('userToken');
    }
}

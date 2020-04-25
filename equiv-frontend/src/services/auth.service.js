/**
 * Auth Service: Authentication Service
 * TODO: Replace axios with Fetch
 */

import axios from 'axios';
import config from '../config';
import VueCookies from 'vue-cookies';

export default {

    login: (user) => {
        console.log("DURING LOGIN");
        return axios.post(`${config.API_SERVER}/user/login`, {
            username: user.username,
            password: user.password
        }).then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                VueCookies.set('userToken', response.data.token);
            }

            return response.data;
        });
    },

    logout: () => {
        localStorage.removeItem('user');
        VueCookies.remove('userToken');
    }
}

/**
 * Auth Service: Authentication Service
 * TODO: Replace axios with Fetch
 */

import axios from 'axios';
const API_URL = 'http://localhost:3030';

export default {

    login: (user) => {
        return axios.post(`${API_URL}/user/login`, {
            username: user.username,
            password: user.password
        }).then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                this.$cookies.set('userToken', response.data.token);
            }

            return response.data;
        });
    },

    logout: () => {
        localStorage.removeItem('user');
        this.$cookies.removeItem('userToken');
    }
}

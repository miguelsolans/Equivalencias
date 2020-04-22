/**
 * User Service: Access Backend Server Data
 */

import axios from 'axios';
import authHeader from './auth-header';

class UserService {
    getUser(username) {
        return axios.get(`${process.env.API_SERVER}/user/${username}`, {
            withCredentials: true
        });
    }
}

export default new UserService();
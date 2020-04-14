/**
 * User Service: Access Backend Server Data
 */

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3030';

class UserService {
    getUser(username) {
        return axios.get(`${API_URL}/user/${username}`, {
            withCredentials: true
        });
    }
}

export default new UserService();
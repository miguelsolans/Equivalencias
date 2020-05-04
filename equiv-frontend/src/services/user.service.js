/**
 * User Service: Access Backend Server Data
 */

import axios from 'axios';
import authHeader from './auth-header';
import config from '../config';

class UserService {
    getUser(username) {
        return axios.get(`${config.API_SERVER}/user/${username}`, {
            headers: authHeader()
        });
    }

    newProcess(student) {
        return axios.post(`${config.API_SERVER}/processo`, student, {
            headers: authHeader()
        })
    }

    listProcesses() {
        return axios.get(`${config.API_SERVER}/processo`, {
            headers: authHeader()
        });
    }

    listUniversities() {
        return axios.get(`${config.API_SERVER}/universidade`, {
            headers: authHeader()
        });
    }

    getProcess(id) {
        return axios.get(`${config.API_SERVER}/processo/${id}`, {
            headers: authHeader()
        });
    }

    newEquivalence(id, equivalence) {
        return axios.put(`${config.API_SERVER}/processo/${id}`, equivalence, {
            headers: authHeader()
        });
    }

    getProcessFiles(id) {
        return axios.get(`${config.API_SERVER}/processo/${id}/files`);
    }
}

export default new UserService();
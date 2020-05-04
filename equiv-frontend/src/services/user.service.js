/**
 * User Service: Access Backend Server Data
 */

import axios from 'axios';
import authHeader from './auth-header';

class UserService {
    getUser(username) {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/user/${username}`, {
            headers: authHeader()
        });
    }

    newProcess(student) {
        return axios.post(`${process.env.VUE_APP_API_SERVER}/processo`, student, {
            headers: authHeader()
        })
    }

    listProcesses() {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/processo`, {
            headers: authHeader()
        });
    }

    listUniversities() {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/universidade`, {
            headers: authHeader()
        });
    }

    getProcess(id) {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/processo/${id}`, {
            headers: authHeader()
        });
    }

    newEquivalence(id, equivalence) {
        return axios.put(`${process.env.VUE_APP_API_SERVER}/processo/${id}`, equivalence, {
            headers: authHeader()
        });
    }

    getProcessFiles(id) {
        console.log("USER SERVICE: " + process.env.VUE_APP_API_SERVER);
        return axios.get(`${process.env.VUE_APP_API_SERVER}/processo/${id}/files`, {
            headers: authHeader()
        });
    }
}

export default new UserService();
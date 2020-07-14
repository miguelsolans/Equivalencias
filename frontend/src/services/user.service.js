/**
 * User Service: Access Backend Server Data
 */

import axios from 'axios';
import authHeader from './auth-header';

class UserService {
    /**
     * Get Account Information
     * @returns {Promise<AxiosResponse<any>>}
     */
    getLoggedUser() {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/user/logged`, {
            headers: authHeader()
        });
    }

    /**
     * Create a new Process
     * @param student object model
     * @returns {Promise<AxiosResponse<any>>}
     */
    newProcess(student) {
        return axios.post(`${process.env.VUE_APP_API_SERVER}/processo`, student, {
            headers: authHeader()
        })
    }

    /**
     * List existing processes
     * @returns {Promise<AxiosResponse<any>>}
     */
    listProcesses() {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/processo`, {
            headers: authHeader()
        });
    }

    /**
     * List registered universities
     * @returns {Promise<AxiosResponse<any>>}
     */
    listUniversities() {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/universidade`, {
            headers: authHeader()
        });
    }

    /**
     * Get Process information based on ID
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     */
    getProcess(id) {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/processo/${id}`, {
            headers: authHeader()
        });
    }

    /**
     * Adds a new subject to a process
     * @param id: process ID
     * @param equivalence: equivalent subject
     * @returns {Promise<AxiosResponse<any>>}
     */
    newEquivalence(id, equivalence) {
        return axios.put(`${process.env.VUE_APP_API_SERVER}/processo/${id}`, equivalence, {
            headers: authHeader()
        });
    }

    /**
     * List PDF Documentation of a Process
     * @param id of the process
     * @returns {Promise<AxiosResponse<any>>}
     */
    getProcessFiles(id) {
        console.log("USER SERVICE: " + process.env.VUE_APP_API_SERVER);
        return axios.get(`${process.env.VUE_APP_API_SERVER}/processo/${id}/files`, {
            headers: authHeader()
        });
    }

    getUniversityCourses(university) {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/universidade/?university=${university}`, {
            headers: authHeader()
        });
    }

    getCourseSubjects(university, course) {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/universidade/?university=${university}&course=${course}`, {
            headers: authHeader()
        });
    }

    getSubject(university, course, subject) {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/universidade?university=${university}&course=${course}&subject=${subject}`, {
            headers: authHeader()
        });
    }


    updatePassword(oldPassword, newPassword) {
        return axios.put(`${process.env.VUE_APP_API_SERVER}/user/password`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: authHeader()
        });
    }

    updateAccount(user) {
        return axios.put(`${process.env.VUE_APP_API_SERVER}/user/update`, {
            fullName: user.fullName,
            email: user.email
        }, {
            headers: authHeader()
        });
    }
}

export default new UserService();
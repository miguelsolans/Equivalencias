/**
 * User Service: Access Backend Server Data
 */

import axios from 'axios';
import authHeader from './auth-header';

class UserService {


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

    //
    // Universities Endpoint
    //
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
     * Register a new University
     * @param university
     * @returns {Promise<AxiosResponse<any>>}
     */
    registerUniversity(university) {
        return axios.post(`${process.env.VUE_APP_API_SERVER}/universidade`, university, {
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
        return axios.post(`${process.env.VUE_APP_API_SERVER}/processo/${id}/subject`, equivalence, {
            headers: authHeader()
        });
    }

    /**
     * List PDF Documentation of a Process
     * @param id of the process
     * @returns {Promise<AxiosResponse<any>>}
     */
    getProcessFiles(id) {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/processo/${id}/files`, {
            headers: authHeader()
        });
    }

    generatePdf(id) {
        return axios.post(`${process.env.VUE_APP_API_SERVER}/processo/${id}/generate`, null, {
            headers: authHeader()
        });
    }

    updateProcess(id, processo) {
        return axios.put(`${process.env.VUE_APP_API_SERVER}/processo/${id}`, processo, {
            headers: authHeader()
        })
    }

    downloadFile(id, filename) {
        let headerAuthType = authHeader();
        //headerAuthType["Accept"] = "application/pdf";
        return axios.get(`${process.env.VUE_APP_API_SERVER}/processo/${id}/file/${filename}`, {
            responseType:'arraybuffer',
            headers: headerAuthType,
        });
    }

    //
    // University Endpoint
    //
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

    deleteUniversity(id) {
        return axios.delete(`${process.env.VUE_APP_API_SERVER}/universidade/${id}`, {
            headers: authHeader()
        });
    }


    //
    // User Endpoint
    //

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
     * Change user password
     * @param oldPassword
     * @param newPassword
     * @returns {Promise<AxiosResponse<any>>}
     */
    updatePassword(oldPassword, newPassword) {
        return axios.put(`${process.env.VUE_APP_API_SERVER}/user/password`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: authHeader()
        });
    }

    /**
     * Update User details
     * @param user
     * @returns {Promise<AxiosResponse<any>>}
     */
    updateAccount(user) {
        return axios.put(`${process.env.VUE_APP_API_SERVER}/user/update`, {
            fullName: user.fullName,
            email: user.email
        }, {
            headers: authHeader()
        });
    }

    getSystemUsers() {
        return axios.get(`${process.env.VUE_APP_API_SERVER}/user`, {
            headers: authHeader()
        });
    }

    newUser(user) {
        return axios.post(`${process.env.VUE_APP_API_SERVER}/user/register`, {
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            password: user.password,
            admin: user.admin
        });
    }

    deleteUser(username) {
        return axios.delete(`${process.env.VUE_APP_API_SERVER}/user/${username}`, {
            headers: authHeader()
        });
    }

    editUser(user) {
        return axios.put(`${process.env.VUE_APP_API_SERVER}/user/update`, {
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            password: user.password,
            admin: user.admin
        });
    }
}

export default new UserService();
/**
 * Used to make authentication requests
 */
import AuthService from '../services/auth.service';

const userStorage = JSON.parse(localStorage.getItem('user'));
// const token = this.$cookies.get('userToken');

const initialSate = userStorage
    ? { status: { loggedIn: true}, userStorage }
    : {status: { loggedIn: false}, user: null };

export const auth = {
    namespaced: true,
    state: initialSate,
    actions: {
        login({commit}, user) {
            console.log(user.username);
            return AuthService.login(user)
                .then(user => {
                    console.log(user);
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                }, error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                });
        },
        logout({commit}) {
            AuthService.logout();
            commit('logout');
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        }
    }
};


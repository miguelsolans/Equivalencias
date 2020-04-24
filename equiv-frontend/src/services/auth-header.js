import VueCookies from 'vue-cookies';
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = VueCookies.get('userToken');

    if(token && user) {
        return { 'userToken': token }
        // return { 'x-access-token': token }
    } else {
        return { };
    }
}
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = this.$cookies.get('userToken');

    if(token && user) {
        return { 'x-access-token': token }
    } else {
        return { };
    }
}
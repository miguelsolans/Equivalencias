<template>
    <div>
        <form>
            <label for="username">Username</label>
            <input id="username" type="text" v-model="username" required autofocus>

            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required autofocus>

            <button type="submit" @click="handleLogin">Login</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Login",
        data: () => {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                let credentials = {
                    username: this.username,
                    password: this.password
                };
                console.log(credentials);

                axios({
                    method: 'POST',
                    url: 'http://localhost:3030/user/login',
                    data: credentials
                }).then(resp => {
                    localStorage.setItem('userToken', resp.data.token);
                    localStorage.setItem('user', JSON.stringify(resp.data.user));
                    this.$router.push('/dashboard');

                    this.$cookies.set('userToken', resp.data.token);
                })
                .catch(err => console.log(err.response));


                // fetch('http://localhost:3030/user/login', {
                //     method: 'POST',
                //     headers: {
                //         'Accept': 'application/json, text/plain, */*',
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(credentials)
                // }).then(resp => {
                //     return {
                //         status: resp.status,
                //         body: await resp.json()
                //     };
                //     // alert(status);
                //     // resp.json().then(data => ({status: resp.status, body: data}))
                //     // if(!resp.ok) {
                //     //     throw new Error("Authentication failed");
                //     // }
                //     // else {
                //     //     return resp.json()
                //     //         .then(data => ({status: resp.status, body: data}));
                //     // }
                // }).then(data => {
                //     if(data.status === 201) {
                //         console.log("Works :-)");
                //         console.log(data);
                //         localStorage.setItem('userToken', data.body.token);
                //         localStorage.setItem('user', JSON.stringify(data.body.user));
                //     } else {
                //         console.log("Snap... Something happened");
                //         console.log(data);
                //     }
                //
                // }).catch(err => {
                //     console.log(err);
                // });
            }
        }
    }
</script>

<style scoped>

</style>
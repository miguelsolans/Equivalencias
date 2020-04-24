<template>

    <v-content>
        <v-alert :value="showErrorAlert" dense outlined dismissible type="error" transition="slide-y-transition">
            {{ message }}
        </v-alert>
        <v-container fluid full-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark float>
                            <v-toolbar-title>Login</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-title>Mantis</v-toolbar-title>
                        </v-toolbar>

                        <v-card-text>
                            <v-form>
                                <v-text-field label="Username" name="username" v-model="username" type="text"></v-text-field>

                                <v-text-field label="Password" name="password" v-model="password" type="password"></v-text-field>
                            </v-form>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="handleLogin">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
<!--    <div>-->
<!--        <form>-->
<!--            <label for="username">Username</label>-->
<!--            <input id="username" type="text" v-model="username" required autofocus>-->

<!--            <label for="password">Password</label>-->
<!--            <input id="password" type="password" v-model="password" required autofocus>-->

<!--            <button type="submit" @click="handleLogin">Login</button>-->
<!--        </form>-->
<!--    </div>-->
</template>

<script>
    // import axios from 'axios';
    import User from '../models/user';

    export default {
        name: "Login",
        data: () => {
            return {
                user: new User('', ''),
                username: '',
                password: '',
                message: '',
                showErrorAlert: false
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created() {
            if(this.loggedIn) {
                this.$router.push('/dashboard');
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

                this.$store.dispatch('auth/login', credentials)
                    .then(() => {
                        this.$router.push('/dashboard');
                    }, error => {
                        alert("ERROR during login");
                        this.message = error;
                        this.showErrorAlert = true;
                        console.log(error);
                    })
                // axios({
                //     method: 'POST',
                //     url: 'http://localhost:3030/user/login',
                //     data: credentials
                // }).then(resp => {
                //     localStorage.setItem('userToken', resp.data.token);
                //     localStorage.setItem('user', JSON.stringify(resp.data.user));
                //     this.$router.push('/dashboard');
                //
                //     this.$cookies.set('userToken', resp.data.token);
                // })
                // .catch(err => console.log(err.response));


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
<template>
    <v-layout column>
        <v-flex xs6>
            <div class="white elevation-2">
                <img src="../assets/Logo.png" style="with: 100%">

                <v-toolbar fat dense class="cyan">
                    <v-toolbar-title>
                        Login
                    </v-toolbar-title>
                </v-toolbar>

                <div class="pl-4 pr-4 pt-2 pb2">
                    <v-text-field
                        label="Username"
                        type="text"
                        v-model="username"
                        class="input-group--focussed"></v-text-field>

                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                        class="input-group-focussed"></v-text-field>

                    <v-btn
                        class="cyan"
                        @click="login">Login</v-btn>
                </div>
                <p>Your input {{ username }}</p>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                let credentials = {
                    username: this.username,
                    password: this.password
                };

                // e.preventDefault();
                //alert("Test...");
                fetch('http://localhost:3030/user/login', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                }).then(resp => resp.json())
                    .then(data => {
                        console.log(data);
                        let d = new Date();
                        d.setTime(d.getTime() + (24*60*60*1000));
                        let expires = "expires=" + d.toUTCString();
                        document.cookie = "userToken=" + data.token + ";" + expires + ";path=/";
                    })
                    .catch(err => console.log(err));
                // alert(this.username);
            }
        }
    }
</script>

<style scoped>
.v-toolbar__title {
    color: white;
}
</style>
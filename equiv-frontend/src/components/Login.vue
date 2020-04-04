<template>
    <v-layout column>
        <v-flex xs6 offset-xs3>
            <div class="white elevation-2">
                <v-toolbar fat dense class="cyan">
                    <v-toolbar-title>Register</v-toolbar-title>
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
                // e.preventDefault();
                //alert("Test...");
                fetch('http://localhost:3030/user/login', {
                    method: 'POST',
                    mode: 'cors',
                    body: {
                        username: this.username,
                        password: this.password
                    }
                }).then(resp => resp.json())
                    .then(data => console.log(data))
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
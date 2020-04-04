<template>
    <v-form ref="form">
        <img src="../assets/Logo.png" style="width:auto; height: 50px;  align-content: center">
        <v-text-field label="Username"
                      name="username"
                      id="username"
                      v-model="username"
                      type="text" required>

        </v-text-field>
        <v-text-field label="Password" name="password" id="password" v-model="password" type="password" required></v-text-field>
        <v-btn class="mx-2" dark color="teal" @click="onLogin">Login</v-btn>
    </v-form>
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
            onLogin () {
                fetch('http://localhost:3030/user/miguelsolans', {
                    method: 'GET',
                    mode: 'cors'
                }).then(resp => resp.json())
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
                // alert(this.username);
            }
        }
    }
</script>

<style scoped>
</style>
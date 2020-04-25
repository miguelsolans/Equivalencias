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
                                <v-text-field label="Username" name="username" v-model="user.username" type="text"></v-text-field>

                                <v-text-field label="Password" name="password" v-model="user.password" type="password"></v-text-field>
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
</template>

<script>
    import User from '../models/user';

    export default {
        name: "Login",
        data: () => {
            return {
                user: new User('', ''),
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

                this.$store.dispatch('auth/login', this.user)
                    .then(() => {
                        this.$router.push('/dashboard');
                    }, error => {
                        alert("ERROR during login");
                        this.message = error;
                        this.showErrorAlert = true;
                        console.log(error);
                    })
            }
        }
    }
</script>

<style scoped>

</style>
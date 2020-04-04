<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm8 offset-sm2 align-center justify-center>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Sign In</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-container>
                            <form>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="emailid">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row xs12>
                                    <v-flex>
                                        <v-btn flat block color="primary"
                                               @click.prevent="validateBeforeSubmit">
                                            Sign In
                                        </v-btn>
                                    </v-flex>
                                    <v-flex>
                                        <v-btn flat block
                                               @click.prevent="clear">
                                            Clear
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
                fetch('http://localhost:3030/user/login', {
                    method: 'POST',
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
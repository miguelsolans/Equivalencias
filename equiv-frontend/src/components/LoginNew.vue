<template>
    
    <v-app>
    <v-content>

        <v-alert :value ="showErrorAlert" dense outlined dismissible type ="error" transition ="slide-y-transition">
            {{ message }}
        </v-alert>

        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <div id ="app">
                        <div id ="login">
                            
                            <div id ="description">
                                <img src="../assets/Logo.png" width=100% height=100%>
                            </div>

                            <div id ="form">
                                    
                                    <label for ="username">Username</label>
                                    <input type ="text" id ="username" v-model ="user.username">

                                    <label for ="password">Password</label>
                                    <input type ="password" id ="password" v-model ="user.password" placeholder ="**********" @keyup.enter ="handleLogin">

                                    <button type ="submit" @click ="handleLogin">Log in</button>
                                
                            </div>
                            
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    
    </v-content>
    </v-app>

</template>

<script src ="https://cdn.jsdelivr.net/npm/vue"></script>

<script>

    import User from '../models/user';

    export default {
        name: "Login",
        data: ()  => {
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
                    .then(()  => {
                        this.$router.push('/dashboard');
                    }, error  => {
                        this.$swal.fire("Erro na autenticação do utilizador", "", "error");
                        this.message  = error;
                        this.showErrorAlert  = true;
                        console.log(error);
                    })
            }
        }
    }
</script>


<style scoped>

    @import url(https://fonts.googleapis.com/css?family =Nunito);
    @import url(https://use.fontawesome.com/releases/v5.0.6/css/all.css);
    @import url(https://raw.githubusercontent.com/simedia-tech/vuejs-login-template/master/styles.css);


    * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    }

    html,
    body {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
    }

    div#app {
    width: 100%;
    height: 100%;
    }

    div#app div#login {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    }

    div#app div#login div#description {
    background-color: #ffffff;
    width: 280px;
    padding: 35px;
    }

    div#app div#login div#description h1,
    div#app div#login div#description p {
    margin: 0;
    }

    div#app div#login div#description p {
    font-size: 0.8em;
    color: #95a5a6;
    margin-top: 10px;
    }

    div#app div#login div#form {
    background-color: #34495e;
    border-radius: 5px;
    box-shadow: 0px 0px 30px 0px #666;
    color: #ecf0f1;
    width: 260px;
    padding: 35px;
    }

    div#app div#login div#form label,
    div#app div#login div#form input {
    outline: none;
    width: 100%;
    }

    div#app div#login div#form label {
    color: #95a5a6;
    font-size: 0.8em;
    }

    div#app div#login div#form input {
    background-color: transparent;
    border: none;
    color: #ecf0f1;
    font-size: 1em;
    margin-bottom: 20px;
    }

    div#app div#login div#form ::placeholder {
    color: #ecf0f1;
    opacity: 1;
    }

    div#app div#login div#form button {
    background-color: #ffffff;
    cursor: pointer;
    border: none;
    padding: 10px;
    transition: background-color 0.2s ease-in-out;
    width: 100%;
    }

    div#app div#login div#form button:hover {
    background-color: #eeeeee;
    }

    @media screen and (max-width: 600px) {
    div#app div#login {
        align-items: unset;
        background-color: unset;
        display: unset;
        justify-content: unset;
    }

    div#app div#login div#description {
        margin: 0 auto;
        max-width: 350px;
        width: 100%;
    }

    div#app div#login div#form {
        border-radius: unset;
        box-shadow: unset;
        width: 100%;
    }

    div#app div#login div#form form {
        margin: 0 auto;
        max-width: 280px;
        width: 100%;
    }
    }

</style>
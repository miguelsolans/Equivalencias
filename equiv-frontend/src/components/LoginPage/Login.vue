<template>
    <v-container class="align-center justify-center">
        <v-row cols="1" class="mb-5">
            <v-col>
                <div id ="app">
                    <div id ="login">

                        <div id ="description" align="center">
                            <img src="../../assets/images/Login.png" width=100% height=100% alt="Logótipo do projeto">
                        </div>

                        <div id ="form">

                            <v-text-field
                                class="form-input"
                                prepend-icon="mdi-account"
                                v-model="user.username"
                                clearable
                                type="text"
                                :rules="rules.name"
                                color="teal lighten-5"
                                placeholder="Insira o username"
                                required
                            ></v-text-field>
                            
                            <v-text-field
                                class="form-input"
                                prepend-icon="mdi-lock"
                                v-model="user.password"
                                clearable
                                :rules="rules.name"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                color="teal lighten-5"
                                placeholder="Insira a palavra-passe"
                                @click:append="showPassword = !showPassword"
                                @keyup.enter="handleLogin"
                                required
                            ></v-text-field>

                            <div class="text-center">
                                <v-btn rounded color="teal lighten-5" @click ="handleLogin">Sign In</v-btn>
                            </div>
                        </div>

                    </div>
                </div>
            </v-col>
        </v-row>

        <v-row cols="1" align="center" justify="center">
            <v-col md="7" sm="9">
                <v-alert v-model="errorAlert" prominent align="center" dismissible elevation="12" type ="error" transition ="slide-y-reverse-transition">
                    {{ message }}
                </v-alert>
            </v-col>
        </v-row>
    
    </v-container>

</template>

<script>

    import User from '../../models/user';

    export default {
        name: "Login",
        data: ()  => {
            return {
                user: new User('', ''),
                message: 'Username e/ou Password inválidos.',
                errorAlert: false,
                username: '',
                showPassword: false,
                password: 'Password',                
                rules: {
                    name: [val => (val || '').length > 0 || 'Campo obrigatório']
                }
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
                        this.errorAlert  = true;
                        console.log(error);
                    })
            }
        }
    }
</script>


<style scoped>

    .form-input >>> .v-input__slot::after {
    border-color: rgba(255, 255, 255, 0.7) !important;
    }

    .form-input >>> .v-input__slot::before {
    border-color: rgba(255, 255, 255, 0.7) !important;
    }
    
    .form-input >>> .error--text {
    color: rgba(255, 255, 255, 0.7) !important;
    }

    .form-input >>> .theme--light.v-messages {
    color: rgba(255, 255, 255, 0.7) !important;
    }

    .form-input >>> .theme--light.v-messages {
    color: rgba(255, 255, 255, 0.7) !important;
    }

    .form-input >>> input {
    caret-color: white !important;
    color: white;
    font-size: 0.9em;
    width: 150px;
    }

    .form-input >>> .v-icon {
        color: white;
    }
    
    * {
    font-family: 'Rubik', sans-serif;
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
    width: 40%;
    }

    div#app div#login div#description h1,
    div#app div#login div#description p {
    margin: 0;
    }

    div#app div#login div#description p {
    font-family: 'Secular One', sans-serif;
    font-size: 4em;
    color: #238e64;
    margin-top: 10px;
    }

    div#app div#login div#description p1 {
    font-size: 1em;
    color: #696969;
    margin-top: 10px;
    }

    div#app div#login div#form {
    background-image: linear-gradient(to bottom,#38c087, #177452);
    border-radius: 8px;
    box-shadow: 0 0 30px 0 #A8A8A8;
    color: white;
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
    color: white;
    opacity: 1;
    }

    div#app div#login div#form  ::label {
    color: white;
    }

    div#app div#login div#form button {
    background-color: #ffffff;
    cursor: pointer;
    border: none;
    padding: 10px;
    transition: background-color 0.2s ease-in-out;
    width: 100%;
    margin-top: 20px;
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
        width: 100%;
    }

    div#app div#login div#form {
        background-image: linear-gradient(to bottom,#38c087, #177452);
        border-radius: 8px;
        box-shadow: 0 0 30px 0 #A8A8A8;
        color: #ecf0f1;
        width: 100%;
        padding: 35px;
    }

    div#app div#login div#form form {
        margin: 0 auto;
        max-width: 280px;
        width: 100%;
    }
    
    }

</style>
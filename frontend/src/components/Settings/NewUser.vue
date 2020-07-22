<template>
    <v-container>
        <h5 class="ml-2 mt-5">* Campos de preenchimento obrigatório</h5>
        <v-form class="mt-5">
            <v-row>
                <v-col cols="6" sm="6">
                    <v-text-field color="#187653" v-model="user.fullName" label="Nome Completo *" type="text" dense filled rounded hide-details clearable/>
                </v-col>
                <v-col cols="6" sm="6">
                    <v-text-field color="#187653" v-model="user.email" label="E-mail *" type="email" :rules="emailRules" dense filled rounded hide-details clearable/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" sm="6">
                    <v-text-field color="#187653" v-model="user.username" label="Username *" type="text" dense filled rounded hide-details clearable/>
                </v-col>
                <v-col cols="6" sm="6">
                    <v-text-field color="#187653" v-model="user.password" hint="Pelo menos 8 caracteres" :rules="passwordRules" label="Password *" type="password" dense filled rounded clearable/>
                </v-col>
            </v-row>
            <v-row class="text-right d-none d-sm-flex">
                <v-col cols="6" sm="6" class="pb-0">
                    <v-checkbox color="#187653" v-model="user.admin" label="Conta Administrador *" required/>
                </v-col>
                <v-col cols="6" sm="6">
                    <v-btn rounded class="ml-5" color="#187653" dark @click="handleSubmit">
                        <div class="text-capitalize mx-1">
                            <strong>Criar Utilizador</strong>
                        </div>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="text-right d-flex d-sm-none">
                <v-col>
                    <v-checkbox color="#187653" v-model="user.admin" label="Conta Administrador" required/>
                </v-col>
                <v-col>
                    <v-btn fab small rounded class="ml-5" color="#187653" dark @click="handleSubmit">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <v-dialog v-model="alert.display" retain-focus persistent max-width="350">
            <v-card style="font-family: Rubik, sans-serif;">
                <v-card-title style="font-weight: bold;" class="justify-center">
                    {{alert.title}}
                </v-card-title>
                <v-card-text class="text-justify">{{alert.message}}</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="#187653" text @click="alert.hideAlert()"><b>Fechar</b></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import User from '../../models/user';
    import UserService from '../../services/user.service';
    import Alert from '../../models/alert';

    export default {
        name: "NewUser",
        props: ["users"],
        data() {
            return {
                alert: new Alert(0, "", "", {}, false),

                user: new User(),

                emailRules: [
                    v => !!v || 'Introduza o E-mail da Conta',
                    v => /.+@.+\..+/.test(v) || 'Deve introduzir um E-mail válido',
                ],
                passwordRules: [
                    v => !!v || "Password não pode estar em branco",
                    v => (v && v.length >= 8) || "A Nova Password deve ter pelo menos 8 caracteres"
                ]
            }
        },
        mounted() {
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                console.group("Creating User");

                UserService.newUser(this.user)
                    .then(response => {
                        console.group("New User Successfully");
                        this.$emit("newUser", response.data);
                        console.log(response.data);
                        this.createAlert("Utilizador Criado", "O Novo Utilizador foi criado com sucesso.")
                        console.groupEnd();
                    })
                    .catch(err => {
                        this.createAlert("Oops!...", "Houve um erro ao criar o Novo Utilizador. Tente novamente mais tarde ou verifique se todos os campos estão preenchidos.")
                        console.log(err)
                    })
                console.groupEnd();
            },

            createAlert(title, message) {
                this.alert.setTitle(title);
                this.alert.setMessage(message);

                this.alert.displayAlert();
            }
        }
    }
</script>

<style scoped>

</style>
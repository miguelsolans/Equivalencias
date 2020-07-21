<template>
    <v-container>
        <h5 class="my-5 ml-2">* Campos de preenchimento obrigatório</h5>
        <v-form>
            <v-row class="d-none d-sm-flex">
                <v-col cols="md">
                    <v-text-field
                        color="#187653"
                        v-model="oldPassword" 
                        label="Password Atual *" 
                        :rules="oldPasswordRules"
                        dense
                        filled
                        rounded
                        clearable
                    />
                </v-col>
                <v-col cols="md">
                    <v-text-field
                        color="#187653"
                        v-model="newPassword" 
                        label="Nova Password *" 
                        hint="Pelo menos 8 caracteres" 
                        :rules="passwordRules"
                        dense
                        filled
                        rounded
                        clearable
                    />
                </v-col>
                <div class="d-none d-sm-flex">
                    <v-col cols="md" class="text-right my-2">
                        <v-btn rounded align-center color="#187653" dark @click="handleSubmit">
                            <div class="text-capitalize">
                                <strong>Guardar Alterações</strong>
                            </div>
                        </v-btn>
                    </v-col>
                </div>
            </v-row>
            <v-text-field
                class="d-flex d-sm-none"
                color="#187653"
                v-model="oldPassword" 
                label="Password Atual *" 
                :rules="oldPasswordRules"
                dense
                filled
                rounded
                clearable
            />
            <v-text-field
                class="d-flex d-sm-none"
                color="#187653"
                v-model="newPassword" 
                label="Nova Password *" 
                hint="Pelo menos 8 caracteres" 
                :rules="passwordRules"
                dense
                filled
                rounded
                clearable
            />
            <div class="d-flex d-sm-none">
                <v-col cols="md" class="text-center">
                    <v-btn rounded color="#187653" dark @click="handleSubmit">
                        <div class="text-capitalize">
                            <strong>Guardar Alterações</strong>
                        </div>
                    </v-btn>
                </v-col>
            </div>
        </v-form>
        <v-dialog v-model="alert.display" persistent max-width="350">
            <v-card>
                <v-card-title class="justify-center">{{alert.title}}</v-card-title>
                <v-card-text  class="text-justify">{{alert.message}}</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="green darken-1" text @click="alert.hideAlert()">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service.js';
    import Alert from '../../models/alert';

    export default {
        name: "Password",
        data() {
            return {
                alert: new Alert(0, "", "", {}, false),

                oldPassword: '',
                newPassword: '',

                oldPasswordRules: [
                    v => !!v || "Digite a sua Password Antiga"
                ],
                passwordRules: [
                    v => !!v || "Password não pode estar em branco",
                    v => (v && v.length >= 8) || "A Nova Password deve ter pelo menos 8 caracteres"
                ]
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                UserService.updatePassword(this.oldPassword, this.newPassword)
                    .then(() => this.createAlert("Password Alterada", "A Password foi alterada com sucesso."))
                    .catch(() => this.createAlert("Oops!...", "Houve um erro ao atualizar a Password. Tente novamente mais tarde ou verifique se todos os campos estão preenchidos."));
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
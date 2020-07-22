<template>
    <v-container>
        <h5 class="my-5 ml-2">* Campos de preenchimento obrigatório</h5>
        <v-form>
            <v-row class="d-none d-sm-flex">
                <v-col cols="6" sm="6">
                    <v-text-field
                        color="#187653"
                        v-model="user.fullName" 
                        label="Nome do Utilizador *" 
                        type="text" 
                        :disabled="readOnly"
                        dense
                        filled
                        rounded
                        clearable
                        required
                    />
                </v-col>
                <v-col cols="6" sm="6">
                    <v-text-field
                        color="#187653"
                        :disabled="readOnly || !user.admin" 
                        v-model="user.username" 
                        label="Username do Utilizador *" 
                        type="text"
                        dense
                        filled
                        rounded
                        clearable
                        required
                    />
                </v-col>
                <v-col cols="6" sm="6">
                    <v-text-field
                        color="#187653"
                        v-model="user.email" 
                        label="E-mail do Utilizador *" 
                        type="text" 
                        :disabled="readOnly"
                        dense
                        filled
                        rounded
                        clearable
                        required
                    />
                </v-col>
                <v-col cols="6" sm="6">
                    <v-row>
                        <v-col class="py-0">
                            <v-checkbox
                                color="#187653"
                                v-model="user.admin" 
                                label="Administrador *" 
                                :disabled="readOnly || !user.admin"
                            />
                        </v-col>
                        <v-col class="text-right">
                            <v-btn rounded align-center color="#187653" :dark="!readOnly" @click="handleSubmit" :disabled="readOnly">
                                <div class="text-capitalize">
                                    <strong>Guardar Alterações</strong>
                                </div>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-text-field
                class="d-flex d-sm-none"
                color="#187653"
                v-model="user.fullName" 
                label="Nome do Utilizador *" 
                type="text" 
                :disabled="readOnly"
                dense
                filled
                rounded
                clearable
                required
            />
            <v-text-field
                class="d-flex d-sm-none"
                color="#187653"
                :disabled="readOnly || !user.admin" 
                v-model="user.username" 
                label="Username do Utilizador *" 
                type="text"
                dense
                filled
                rounded
                clearable
                required
            />
            <v-text-field
                color="#187653"
                class="d-flex d-sm-none"
                v-model="user.email" 
                label="E-mail do Utilizador *" 
                type="text" 
                :disabled="readOnly"
                dense
                filled
                rounded
                clearable
                required
            />
            <div class="d-flex d-sm-none">
                <v-col cols="md" class="text-center">
                    <v-btn rounded color="#187653" :dark="!readOnly" @click="handleSubmit" :disabled="readOnly">
                        <div class="text-capitalize">
                            <strong>Guardar Alterações</strong>
                        </div>
                    </v-btn>
                </v-col>
            </div>
            <v-switch 
                color="#187653" 
                v-model="readOnly" 
                class="my-2" 
                label="Modo de Leitura"
            />
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
    import Alert from "../../models/alert";

    export default {
        name: "Account",
        data() {
            return {
                alert: new Alert(0, "", "", {}, false),
                user: new User(),
                oldUser: new User(),
                readOnly: true,
            }
        },
        mounted() {
            UserService.getLoggedUser()
                .then(response => {
                    let data = response.data;
                    this.user = new User(data.username, data.fullName, data.admin, data.email);
                    Object.assign(this.oldUser, this.user);
                    console.table(this.user);
                }).catch(err => console.log(err));
        },
        methods: {

            rollback() {
                Object.assign(this.user, this.oldUser);
            },

            handleSubmit(e) {
                e.preventDefault();
                console.log("Updating details...");

                UserService.updateAccount(this.user)
                    .then(response => {
                        let { data } = response;
                        this.createAlert("Utilizador Atualizado", `O Utilizador ${this.user.fullName} foi atualizado com sucesso.`);
                        console.log(data);
                    }).catch(err => {
                        this.createAlert("Oops!...", `Não foi possível atualizar o Utilizador ${this.user.fullName}.`);
                        console.log(err)
                    });
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
    .avatar {
        max-width: 150px;
    }
</style>
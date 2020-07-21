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
    </v-container>
</template>

<script>
    import User from '../../models/user';
    import UserService from '../../services/user.service';

    export default {
        name: "Account",
        data() {
            return {
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

                        console.log(data);
                    }).catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>
    .avatar {
        max-width: 150px;
    }
</style>
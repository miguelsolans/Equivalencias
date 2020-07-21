<template>
    <v-container>
        <v-form>
            <v-row class="d-none d-sm-flex">
                <v-col cols="6" sm="6">
                    <v-text-field
                        color="#187653"
                        v-model="user.fullName" 
                        label="Nome do Utilizador" 
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
                        label="Username do Utilizador" 
                        type="text"
                        dense
                        filled
                        rounded
                        clearable
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="md">
                    <v-text-field 
                        color="#187653"
                        v-model="user.email" 
                        label="E-mail do Utilizador" 
                        type="text" 
                        :disabled="readOnly"
                        dense
                        filled
                        rounded
                        clearable
                    />
                </v-col>
                <v-col cols="md">
                    <v-checkbox
                        color="#187653"
                        v-model="user.admin" 
                        label="Administrador da Plataforma" 
                        :disabled="readOnly || !user.admin"
                    />
                </v-col>
                <div class="d-none d-sm-flex">
                    <v-col cols="md" class="text-right my-2">
                        <v-btn rounded align-center color="#187653" dark @click="handleSubmit" :disabled="readOnly">
                            <div class="text-capitalize">
                                <strong>Guardar Alterações</strong>
                            </div>
                        </v-btn>
                    </v-col>
                </div>
            </v-row>
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
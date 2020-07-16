<template>
    <v-container>
        <v-form>
            <v-text-field v-model="user.fullName" label="Nome do Utilizador" type="text" :disabled="readOnly"></v-text-field>

            <!-- TODO: Add Tooltip indicating to contact admin if user desires to change his username -->
            <v-text-field :disabled="readOnly || !account.admin" v-model="user.username" label="Username do Utilizador" type="text"></v-text-field>
            <v-text-field v-model="user.email" label="E-mail do Utilizador" type="text" :disabled="readOnly"></v-text-field>
            <v-checkbox v-model="user.admin" label="Administrador da Plataforma" :disabled="readOnly || !account.admin"></v-checkbox>
            <v-btn color="teal" dark @click="handleSubmit" :disabled="readOnly">Guardar Alterações</v-btn>
        </v-form>
        <v-switch v-model="readOnly" class="mx-2" label="Modo de Leitura"></v-switch>

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
                updatePassword: {
                    requested: false,
                    currentPassword: '',
                    newPassword: ''
                }
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
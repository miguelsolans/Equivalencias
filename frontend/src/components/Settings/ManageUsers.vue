<template>
    <v-container>
        <v-data-table class="table-striped" color="#187653" fixed-header :headers="headers" :items="users">
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editUser(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteUser(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>


        <v-dialog v-model="editModal">
            <v-card>
                <v-card-title>Editar Utilizador: {{this.userEdit.username}}</v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form>
                            <v-text-field v-model="userEdit.fullName" label="Nome Completo" type="text"/>
                            <v-text-field v-model="userEdit.username" label="Username" type="text"/>
                            <v-text-field v-model="userEdit.email" label="E-mail" type="email"/>
                            <v-checkbox v-model="userEdit.admin" label="Administrador da Plataforma"></v-checkbox>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="blue darken-1" text @click="editModal = false">Fechar</v-btn>
                    <v-btn color="blue darken-1" text @click="handleSubmit">Atualizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


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
    import UserService from '../../services/user.service';
    import User from '../../models/user';
    import Alert from '../../models/alert';
    export default {
        name: "ManageUsers",
        props: ["users"],
        data() {
            return {
                userEdit: new User("", "", false, "", ""),
                alert: new Alert(0, "", "", {}, false),
                editModal: false,
                headers: [
                    { text: "Nome", value: "fullName"},
                    { text: "Username", value: "username"},
                    { text: "E-mail", value: "email"},
                    { text: "Tipo de Utilizador", value: "admin"},
                    { text: "Operações", value: "actions", sortable: false}
                ],
            }
        },
        mounted() {
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                UserService.editUser(this.userEdit)
                    .then(response => {
                        console.log(response.data);

                        this.createAlert("Conta Atualizada", `A conta de ${this.userEdit.fullName} foi atualizada com sucesso!`);

                        this.editModal = false;
                    }).catch(err => {
                        this.editModal = false;
                        this.createAlert("Oops...!", `Não foi possível atualizar a conta de ${this.userEdit.fullName}. Tente novamente mais tarde.`);
                        console.log(err)
                });
            },
            editUser(item) {
                console.log("Editing User");

                this.editModal = true;

                this.userEdit = new User(item.username, item.fullName, item.admin, item.email);

                console.log(item.username);
            },
            deleteUser(item) {
                UserService.deleteUser(item.username)
                    .then(response => {
                        console.log(response);
                        // TODO: Emit change to parent
                    }).catch(err => {
                        console.log(err);
                        // TODO: Add error alert
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

</style>
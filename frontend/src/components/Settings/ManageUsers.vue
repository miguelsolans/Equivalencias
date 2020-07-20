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

                            <v-btn primary @click="handleSubmit">Guardar Alterações</v-btn>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    import User from '../../models/user';
    export default {
        name: "ManageUsers",
        props: ["users"],
        data() {
            return {
                userEdit: new User("", "", false, "", ""),
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

                    }).catch(err => console.log(err));
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
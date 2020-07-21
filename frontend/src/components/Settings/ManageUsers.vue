<template>
    <v-container>
        <v-data-table 
            class="table-striped" 
            color="#187653" 
            fixed-header 
            :headers="headers" 
            :items="users"
            :page.sync="page"
            :pagination.sync="pagination"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
        >
            <template v-slot:item.actions="{ item }">
                <v-icon color="#187653" small class="mr-2" @click="editUser(item)">
                    mdi-pencil
                </v-icon>
                <v-icon color="#187653" small @click="deleteUser(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:item.typeUser="{ item }">
                <span v-if="item.admin">Administrador</span>
                <span v-else>Standard</span>
            </template>
        </v-data-table>
        <div class="my-5 text-center pt-2">
            <v-pagination
                color="#187653" 
                v-model="page" 
                :length="pageCount"
                circle
            ></v-pagination>
        </div>

        <v-dialog v-model="editModal" retain-focus persistent max-width="600px">
            <v-card style="font-family: Rubik, sans-serif;">
                <v-card-title class="pt-5 py-4 justify-center">
                    <h3>Editar Dados do Utilizador</h3>
                </v-card-title>
                <v-card-text>
                    <v-card-text>
                        <v-form>
                            <v-row class="d-none d-sm-flex">
                                <v-col cols="6" sm="6">
                                    <v-text-field color="#187653" v-model="userEdit.fullName" label="Nome Completo" type="text" filled rounded dense clearable/>
                                </v-col>
                                <v-col cols="6" sm="6">
                                    <v-text-field color="#187653" v-model="userEdit.username" label="Username" type="text" filled rounded dense clearable/>
                                </v-col>
                            </v-row>
                            <v-text-field class="d-flex d-sm-none" color="#187653" v-model="userEdit.fullName" label="Nome Completo" type="text" filled rounded dense clearable/>
                            <v-text-field class="d-flex d-sm-none" color="#187653" v-model="userEdit.username" label="Username" type="text" filled rounded dense clearable/>
                            <v-text-field color="#187653" v-model="userEdit.email" label="E-mail" type="email" filled rounded dense clearable/>
                            <v-checkbox class="text-center" color="#187653" v-model="userEdit.admin" label="Administrador da Plataforma"></v-checkbox>
                        </v-form>
                    </v-card-text>
                </v-card-text>
                <v-card-actions class="pt-0 justify-center">
                    <v-btn color="#187653" text @click="editModal = false"><b>Voltar Atrás</b></v-btn>
                    <v-btn  color="#34ac80" text @click="handleSubmit"><b>Atualizar</b></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="alert.display" persistent max-width="350">
            <v-card>
                <v-card-title class="justify-center">{{alert.title}}</v-card-title>
                <v-card-text  class="text-justify">{{alert.message}}</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="#187653" text @click="alert.hideAlert()">Fechar</v-btn>
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
                page: 1,
                pageCount: 0,
                itemsPerPage: 5,
                userEdit: new User("", "", false, "", ""),
                alert: new Alert(0, "", "", {}, false),
                editModal: false,
                headers: [
                    { text: "Nome", value: "fullName"},
                    { text: "Username", value: "username"},
                    { text: "E-mail", value: "email"},
                    { text: "Tipo de Utilizador", value: "typeUser"},
                    { text: "Operações", value: "actions", align: "center", sortable: false}
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

                        this.createAlert("Conta Atualizada", `A conta de ${this.userEdit.fullName} foi atualizada com sucesso.`);

                        this.editModal = false;
                    }).catch(err => {
                        this.editModal = false;
                        this.createAlert("Oops...!", `Não foi possível atualizar a conta de ${this.userEdit.fullName}. Tente novamente mais tarde ou verifique se todos os campos estão preenchidos.`);
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
                        this.$emit("removeUser", response.data);
                    }).catch(err => {
                        this.createAlert("Oops!...", `Não foi possível eliminar o utilizador ${item.username}`);
                        console.log(err);
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
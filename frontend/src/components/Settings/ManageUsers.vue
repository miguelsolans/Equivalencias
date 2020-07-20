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
    </v-container>

</template>

<script>
    import UserService from '../../services/user.service';
    export default {
        name: "ManageUsers",
        props: ["users"],
        data() {
            return {
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
            editUser(item) {
                console.log("Editing User");
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
            }
        }
    }
</script>

<style scoped>

</style>
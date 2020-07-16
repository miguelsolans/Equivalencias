<template>
    <v-container>
        <v-data-table class="table-striped" color="#187653" fixed-header :headers="headers" :items="users"/>
    </v-container>

</template>

<script>
    import UserService from '../../services/user.service';
    export default {
        name: "ManageUsers",
        data() {
            return {
                headers: [
                    { text: "Nome", value: "fullName"},
                    { text: "Username", value: "username"},
                    { text: "E-mail", value: "email"},
                    { text: "Tipo de Utilizador", value: "admin"}
                    //"Nome", "Username", "E-mail", "Tipo de Utilizador"
                ],
                users: []
            }
        },
        mounted() {
            this.fetchUsers();
        },
        methods: {
            fetchUsers() {
                UserService.getSystemUsers()
                    .then(response => {
                        this.users.push(...response.data);
                        console.log(this.users);
                    }).catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
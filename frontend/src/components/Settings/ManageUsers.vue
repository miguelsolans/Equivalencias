<template>
    <v-container>
        <v-data-table class="table-striped" color="#187653" fixed-header :headers="headers" :items="users"/>
    </v-container>

</template>

<script>
    // import UserService from '../../services/user.service';
    export default {
        name: "ManageUsers",
        props: ["users"],
        data() {
            return {
                headers: [
                    { text: "Nome", value: "fullName"},
                    { text: "Username", value: "username"},
                    { text: "E-mail", value: "email"},
                    { text: "Tipo de Utilizador", value: "admin"}
                ],
                // users: []
            }
        },
        mounted() {
            //this.fetchUsers();
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
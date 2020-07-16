<template>
    <v-container>
        <v-form>
            <v-text-field v-model="user.username" label="Nome do Utilizador" type="text"/>
            <v-text-field v-model="user.username" label="Username" type="text"/>
            <v-text-field v-model="user.email" label="E-mail" type="email"/>
            <v-text-field v-model="user.password" label="E-mail" type="password"/>
            <v-checkbox v-model="user.admin" label="Conta de Administração"/>

            <v-btn color="error" @click="handleSubmit">Criar Utilizador</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import User from '../../models/user'
    export default {
        name: "NewUser",
        data() {
            return {
                user: new User(),
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
            }
        }
    }
</script>

<style scoped>

</style>
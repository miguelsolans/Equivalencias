<template>
    <v-container>
        <v-form>
            <v-text-field v-model="user.username" label="Nome do Utilizador"/>
            <v-text-field v-model="user.email" label="Username"/>
            <v-text-field v-model="user.email" label="E-mail"/>
            <v-text-field v-model="user.email" label="E-mail"/>

            <v-btn color="error" @click="handleSubmit">Alterar Password</v-btn>
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
        }
    }
</script>

<style scoped>

</style>
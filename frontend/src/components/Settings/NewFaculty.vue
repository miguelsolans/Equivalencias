<template>
    <v-container>
        <v-form>
            <v-text-field v-model="codInstit" label="Código da Instituição" type="number" required/>
            <v-text-field v-model="nomeInstit" label="Nome da Instituição" type="text" required/>

            <v-btn color="error" @click="handleSubmit">Registar Faculdade</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    export default {
        name: "NewFaculty",
        props: ["universities"],
        data() {
            return {
                codInstit: '',
                nomeInstit: '',
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                UserService.
            }
        }
    }
</script>

<style scoped>

</style>
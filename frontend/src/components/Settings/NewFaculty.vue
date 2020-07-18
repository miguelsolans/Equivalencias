<template>
    <v-container>
        <v-form>
            <v-text-field v-model="university.codInstit" label="Código da Instituição" type="number" required/>
            <v-text-field v-model="university.nomeInstit" label="Nome da Instituição" type="text" required/>

            <v-btn color="error" @click="handleSubmit">Registar Faculdade</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    import University from '../../models/university';
    export default {
        name: "NewFaculty",
        props: ["universities"],
        data() {
            return {
                university: new University()
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                UserService.registerUniversity(this.university)
                    .then(response => {

                        console.log(response.data);
                    })
                    .catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
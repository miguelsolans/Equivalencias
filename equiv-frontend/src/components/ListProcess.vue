<template>
    <v-container>
        <h2>Lista de Processos</h2>
        <v-container>
            <v-layout v-for="process in processes" row :key="process.processo">
                <v-flex md6>
                    <p>{{process.nomeAluno}}</p>
                    <v-img src="../assets/User.png"></v-img>
                </v-flex>
                <v-flex md6>
                    <p><b>Número de Processo</b></p>
                    <p>{{process.processo}}</p>

                    <p><b>Número de Aluno</b></p>
                    <p>{{ process.idAluno }}</p>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
    import UserService from '../services/user.service'
    export default {
        name: "ListProcess",
        data() {
            return {
                processes: null,
                message: ''
            }
        },
        mounted() {
            UserService.listProcesses()
                .then(response => this.processes = response.data)
                .catch(err => {
                    this.message = err;
                });
        }
    }
</script>

<style scoped>

</style>
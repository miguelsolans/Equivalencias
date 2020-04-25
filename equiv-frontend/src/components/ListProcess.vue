<template>
    <div>
        <p>Error: {{message}}</p>

        <ul>
            <li v-for="process in processes" :key="process.processo">
                <p>{{process.nomeAluno}}</p>
                <p>Número de Processo</p>
                <p>{{process.processo}}</p>
                <p>Número de Aluno</p>
                <p>{{process.idAluno}}</p>
            </li>
        </ul>
    </div>
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
            this.processes = " Hello";
        }
    }
</script>

<style scoped>

</style>
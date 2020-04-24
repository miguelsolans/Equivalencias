<template>
    <form>
        <label for="processo">Identificador do Processo</label>
        <input id="processo" type="text" v-model="processo" required>

        <label for="idAluno">Identificador do Aluno</label>
        <input id="idAluno" type="text" v-model="idAluno" required>

        <label for="nomeAluno">Nome Completo do Aluno</label>
        <input id="nomeAluno" type="text" v-model="nomeAluno" required>

        <label for="institProv">Instituição Proveninente</label>
        <input id="institProv" type="text" v-model="institProv" required>

        <label for="cursoProv">Curso Proveninente</label>
        <input id="cursoProv" type="text" v-model="cursoProv" required>

        <button type="submit" @click="handleSubmit">Criar</button>
    </form>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ListaProcessos",
        data() {
            return {
                processo: '',
                idAluno: '',
                nomeAluno: '',
                institProv: '',
                cursoProv: ''
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                const token = localStorage.getItem('userToken');
                const student = {
                    processo: this.processo,
                    idAluno: this.idAluno,
                    nomeAluno: this.nomeAluno,
                    institProv: this.institProv,
                    cursoProv: this.cursoProv
                };
                console.log(token);
                console.log(student);
                axios({
                    method: 'POST',
                    url: 'http://localhost:3030/processo',
                    // crossdomain: true,
                    withCredentials: true,
                    data: student
                })
                .then(value => console.log(value.data))
                .catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
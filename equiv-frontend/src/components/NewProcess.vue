<template>
    <v-container>
        <v-img src="../assets/Logo.png"></v-img>
        <h2>Novo Processo</h2>
        <v-form>
            <v-text-field label="Identificador do Processo" type="text" v-model="student.processo" required></v-text-field>

            <v-text-field label="Identificador do Aluno" type="text" v-model="student.idAluno" required></v-text-field>

            <v-text-field label="Nome Completo do Aluno" type="text" v-model="student.nomeAluno" required></v-text-field>

            <v-text-field label="Instituição Proveninente" type="text" v-model="student.instProv" required></v-text-field>

            <v-select label="Instituição Proveniente" type="text" :items="universities"></v-select>
<!--            <v-text-field label="Curso Proveninente" type="text" v-model="student.cursoProv" required></v-text-field>-->

            <v-btn color="primary" @click="handleSubmit">Criar</v-btn>
            <v-btn color="normal" @click="clearForm">Cancelar</v-btn>
        </v-form>
    </v-container>

</template>

<script>
    // import axios from 'axios';
    import Processo from '../models/processo';
    import UserService from '../services/user.service';
    // import axios from "axios";
    // import config from "../config";

    export default {
        name: "ListaProcessos",
        data() {
            return {
                // universities: null,
                student: new Processo('', '', '', '', '')
            }
        },
        mounted() {
            // UserService.listUniversities()
            //     .then(result => console.log(result))
            //     .catch(err => console.log(err));
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                // this.student = new Processo(this.processo, this.idAluno, this.nomeAluno, this.instProv, this.cursoProv);

                UserService.newProcess(this.student)
                    .then(data => {
                        console.log(data);
                        this.student = new Processo();
                    })
                    .catch(err => console.log(err));
            },

            clearForm() {
                this.student = new Processo();
            }
        }
    }
</script>

<style scoped>

</style>
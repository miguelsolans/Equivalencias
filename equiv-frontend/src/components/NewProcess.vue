<template>
    <v-container>
        <v-row align="center">
            <h2 class="text-center">Novo Processo</h2>
        </v-row>
        <v-form>
            <v-text-field label="Identificador do Processo" type="text" v-model="student.processo" required></v-text-field>

            <v-text-field label="Identificador do Aluno" type="text" v-model="student.idAluno" required></v-text-field>

            <v-text-field label="Nome Completo do Aluno" type="text" v-model="student.nomeAluno" required></v-text-field>

<!--            <v-text-field label="Instituição Proveninente" type="text" v-model="student.instProv" required></v-text-field>-->

            <v-autocomplete v-model="student.instProv" label="Instituição Proveniente" type="text" :items="universities" item-text="nomeInstit" @change="universityChosen"></v-autocomplete>

            <v-text-field label="Curso Proveninente" type="text" v-model="student.cursoProv" required></v-text-field>

            <v-btn color="teal" dark @click="handleSubmit">Criar</v-btn>
            <v-divider  class="mx-4" inset vertical></v-divider>
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
                universities: null,
                student: new Processo('', '', '', '', '')
            }
        },
        mounted() {
            UserService.listUniversities()
                .then(result => this.universities = result.data)
                .catch(err => console.log(err));
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                UserService.newProcess(this.student)
                    .then(response => {
                        console.log(response);

                        if(response.data.errors) {
                            alert("HANDLE ERROR");
                        } else {
                            this.student = new Processo();
                        }
                    })
                    .catch(err => console.log(err));
            },
            universityChosen() {
                console.log(`${this.student.instProv}`);
            },
            clearForm() {
                this.student = new Processo();
            }
        }
    }
</script>

<style scoped>
    .container {
        max-width: 700px;
    }
</style>
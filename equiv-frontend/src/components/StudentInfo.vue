<template>
    <v-container>
        <v-row>
            <v-col md2>
                <img class="avatar" src="../assets/User.png">
            </v-col>

            <v-col md10>
                <h2>Perfil do Aluno</h2>
                <v-form>
                    <v-text-field v-model="process.processo" label="Identificador do Processo" :disabled="readOnly"></v-text-field>
                    <v-text-field v-model="process.idAluno" label="Identificador do Aluno" :disabled="readOnly"></v-text-field>
                    <v-text-field v-model="process.nomeAluno" label="Nome do Aluno" :disabled="readOnly"></v-text-field>
                    <v-text-field v-model="process.instProv" label="Instituição Proveniente" :disabled="readOnly"></v-text-field>
                    <v-text-field v-model="process.cursoProv" label="Curso Proveniente" :disabled="readOnly"></v-text-field>
                    <v-switch v-model="readOnly" class="mx-2" label="Modo de Leitura"></v-switch>

                    <!-- constructor(processo, idAluno, nomeAluno, instProv, cursoProv) -->

                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UserService from '../services/user.service';

    export default {
        name: "StudentInfo",
        data() {
            return {
                process: null,
                processId: this.$route.params.id,
                readOnly: true
            }
        },
        mounted() {
            UserService.getProcess(this.processId)
                .then(response => {

                    this.process = response.data;
                }).catch(err => {
                    // TODO: Do something with error
                    console.log(err);
            })
        }
    }
</script>

<style scoped>
    .avatar {
        max-width: 150px;
    }
</style>
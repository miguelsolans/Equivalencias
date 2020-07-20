<template>
    <v-container>
        <div v-if="process !== null">
            <v-row class="d-none d-sm-flex mr-7 ml-7" no-gutters>
                <v-col cols="12" sm="6" md="8">
                    <h1>Processo Equivalência</h1>
                    <p style="color: #187653">Número {{ process.processo }}</p>
                </v-col>
                <v-col cols="6" sm="6" md="4" align="right">
                    <v-row align="center" no-gutters>
                        <v-col class="mx-5">
                            <h4 style="color: #187653">Aluno(a) {{ process.nomeAluno }}</h4>
                            <p>Número {{ process.idAluno }}</p>
                        </v-col>
                        <v-col class="mb-5" cols="2">
                            <v-avatar size="65px">
                                <img src="../assets/images/EditProcess.png" alt="Avatar para o processo"/>
                            </v-avatar>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="text-right d-flex d-sm-none ml-5" no-gutters>
                <v-col cols="6" align="left">
                    <h1>Processo Equivalência</h1>
                    <p style="color: #187653">{{ process.processo }}</p>
                </v-col>
                <v-col cols="6" align="right">
                    <v-row align="center" no-gutters>
                        <v-col class="mt-5" cols="12">
                            <v-avatar size="75px">
                                <img src="../assets/images/EditProcess.png" alt="Avatar para o processo"/>
                            </v-avatar>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-tabs centered show-arrows class="my-10" color="#187653">
                <v-tab>Informações Gerais</v-tab>
                <v-tab>Lista Equivalências</v-tab>
                <v-tab>Formulário Nova Equivalência</v-tab>
                <v-tab>Documentos</v-tab>

                <v-tab-item>
                    <StudentInfo :process="process"/>
                </v-tab-item>

                <v-tab-item>
                    <Equivalences :equivalencias="process.equivalencias"/>
                </v-tab-item>

                <v-tab-item>
                    <NewEquivalence :process="process" @newEquivalence="newEquivalence"/>
                </v-tab-item>

                <v-tab-item>
                    <ProcessFiles/>
                </v-tab-item>
            </v-tabs>
        </div>
        <div v-else>

            <v-dialog v-model="error" persistent max-width="350">
                <v-card>
                    <v-card-title class="headline">Processo não encontrado.</v-card-title>
                    <v-card-text>{{textoErro}}</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="rollback">Voltar Atrás</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </div>
    </v-container>
</template>

<script>
    // Data API Class
    import UserService from '../services/user.service';

    // Load Views
    import StudentInfo from '../components/Student/StudentInfo';
    import Equivalences from '../components/Student/ProcessEquivalences';
    import NewEquivalence from '../components/Student/NewEquivalence';
    import ProcessFiles from '../components/Student/ProcessFiles';


    export default {
        name: "Student",
        data() {
            return {
                id: this.$route.params.id,
                process: null,
                error: null,
                //     constructor(code, title, message, stack, isError)  {

                textoErro: "Não foram encontrados registos deste processo. Por favor tente novamente mais tarde."
            }
        },
        components: { StudentInfo, Equivalences, NewEquivalence, ProcessFiles },
        mounted() {
            UserService.getProcess(this.id)
                .then(response => {
                    this.process = response.data;
                    console.log(this.process);
                }).catch(err => {
                    this.error = err;
                    console.log(err);
            })
        },
        methods: {
            // Router Events
            newEquivalence(equivalence) {
                console.log("/student Parent new Equivalence");
                this.process.equivalencias.push(equivalence);
            },
            rollback() {
                this.$router.push('/login')
                .catch(err => console.log(err));
            },

        }
    }
</script>

<style scoped>


</style>
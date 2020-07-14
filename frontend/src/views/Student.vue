<template>
    <v-container>
        <div v-if="process !== null">
            <h2>Gestão do Processo {{ process.processo }}</h2>
            <v-tabs>
                <v-tab>Informações</v-tab>
                <v-tab>Equivalências</v-tab>
                <v-tab>Formulário</v-tab>
                <v-tab>Documentação</v-tab>

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
                textoErro: "Este processo não se encontra presente no servidor. Por favor tente novamente mais tarde."
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
            }
        }
    }
</script>

<style scoped>

</style>
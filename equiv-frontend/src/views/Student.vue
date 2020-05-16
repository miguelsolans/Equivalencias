<template>
    <v-container>
        <div v-if="process !== null">
            <h2>Gestão do Processo {{ process.processo }}</h2>
            <v-tabs>
                <v-tab>Informações</v-tab>
                <v-tab>Equivalencias</v-tab>
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
            <p>Não há dados</p>
        </div>

    </v-container>
</template>

<script>
    // Data API Class
    import UserService from '../services/user.service';
    // Load Views
    import StudentInfo from '../components/StudentInfo';
    import Equivalences from '../components/ProcessEquivalences';
    import NewEquivalence from '../components/NewEquivalence';
    import ProcessFiles from '../components/ProcessFiles';


    export default {
        name: "Student",
        data() {
            return {
                id: this.$route.params.id,
                process: null,
                error: null
            }
        },
        components: { StudentInfo, Equivalences, NewEquivalence, ProcessFiles },
        mounted() {
            UserService.getProcess(this.id)
                .then(response => {
                    this.process = response.data;
                }).catch(err => {
                    // TODO: Handle error in view
                    this.error = err;
                    console.log(err);
            })
        },
        methods: {
            // Router Events
            newEquivalence(equivalence) {
                console.log("/student Parent new Equivalence");
                this.process.equivalencias.push(equivalence);
            }
        }
    }
</script>

<style scoped>

</style>
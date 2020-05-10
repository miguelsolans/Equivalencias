<template>
    <div>
        <h2>Gestão do Processo {{ id }}</h2>
        <v-tabs>
            <v-tab>Informações</v-tab>
            <v-tab>Equivalencias</v-tab>
            <v-tab>Formulário</v-tab>
            <v-tab>Documentação</v-tab>

            <v-tab-item>
                <StudentInfo/>
            </v-tab-item>
            <v-tab-item>
                <Equivalences/>
            </v-tab-item>

            <v-tab-item>
                <NewEquivalence/>
            </v-tab-item>

            <v-tab-item>
                <ProcessFiles/>
            </v-tab-item>
        </v-tabs>

    </div>
</template>

<script>
    import StudentInfo from '../components/StudentInfo';
    import Equivalences from '../components/ProcessEquivalences';
    import NewEquivalence from '../components/NewEquivalence';
    import ProcessFiles from '../components/ProcessFiles';
    export default {
        name: "Student",
        data() {
            return {
                id: this.$route.params.id
            }
        },
        components: { StudentInfo, Equivalences, NewEquivalence, ProcessFiles }
    }
</script>

<style scoped>

</style>
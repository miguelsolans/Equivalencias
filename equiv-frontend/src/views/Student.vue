<template>
    <div>
        <h2>Gestão do Processo {{ id }}</h2>
        <v-tabs>
            <v-tab>Equivalencias</v-tab>
            <v-tab>Formulário</v-tab>
            <v-tab>Documentação</v-tab>

            <v-tab-item>
                <Equivalences/>
            </v-tab-item>

            <v-tab-item>
                <NewEquivalence/>
            </v-tab-item>
        </v-tabs>

    </div>
</template>

<script>
    import Equivalences from '../components/StudentEquivalences';
    import NewEquivalence from '../components/NewEquivalence'
    export default {
        name: "Student",
        data() {
            return {
                id: this.$route.params.id
            }
        },
        components: { Equivalences, NewEquivalence }
    }
</script>

<style scoped>

</style>
<template>
    <v-container>
        <v-data-table
            fixed-header
            :headers="headers"
            :items="equivalencias">
        </v-data-table>
    </v-container>
</template>

<script>
    import UserService from '../services/user.service';
    export default {
        name: "StudentEquivalences",
        data() {
            return {
                // Table Configuration
                headers: [
                    {text: "UC Equivalente", value: "ucEquiv"},
                    {text: "Nota", value: "nota"},
                    {text: "ECTS", value: "ects"},
                    {text: "UC Realizada", value: "ucRealizada"}
                ],
                processId: this.$route.params.id,
                student: [],
                equivalencias: [],
                error: null
            }
        },
        mounted() {
            UserService.getProcess(this.processId)
                .then(result => {
                    this.student = result.data;
                    this.equivalencias = this.student.equivalencias;
                })
                .catch(err => this.error = err);
        }
    }
</script>

<style scoped>

</style>
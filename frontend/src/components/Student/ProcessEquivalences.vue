<template>
    <v-container>
        <v-data-table
            class="table-striped"
            color="#187653"
            fixed-header
            :headers="headers"
            :items="equivalencias">
        </v-data-table>
    </v-container>
</template>

<script>
    // import UserService from '../services/user.service';
    export default {
        name: "ProcessEquivalences",
        props: ["equivalencias"],
        data() {
            return {
                // Table Configuration
                headers: [
                    {text: "UC Equivalente", value: "ucEquiv"},
                    {text: "Nota UC", value: "nota"},
                    {text: "ECTS", value: "ects"},
                    {text: "UC Realizada", value: "ucRealizada"}
                ],
                processId: this.$route.params.id,
                student: [],
                error: null
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
    }
</style>
<template>
    <v-container>
        <v-data-table class="table-striped" color="#187653" fixed-header :headers="headers" :items="universities"/>
    </v-container>
</template>

<script>
    export default {
        name: "ManageFaculty",
        props: ['universities'],
        data() {
            return {
                headers: [
                    { text: "Código", value: "codInstit" },
                    { text: "Nome", value: "nomeInstit" }
                ],
            }
        },
        mounted() {
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
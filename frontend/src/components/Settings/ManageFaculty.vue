<template>
    <v-container>
        <v-data-table class="table-striped" color="#187653" fixed-header :headers="headers" :items="universities"/>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
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
            this.fetchUniversities()
        },
        methods: {
            fetchUniversities() {
                console.group("Fetching Universities");
                UserService.listUniversities()
                    .then(response => {

                        this.universities.push(...response.data);
                        console.table(response);
                    })
                    .catch(err => console.log(err));

                console.groupEnd();
            }
        }
    }
</script>

<style scoped>

</style>
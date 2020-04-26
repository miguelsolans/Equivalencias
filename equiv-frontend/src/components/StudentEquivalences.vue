<template>
    <v-container>
        <p>Subjects</p>

        <v-data-table :items="equivalencias">

        </v-data-table>
    </v-container>
</template>

<script>
    import UserService from '../services/user.service';
    export default {
        name: "StudentEquivalences",
        data() {
            return {
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
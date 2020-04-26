<template>
    <v-container>
        <p>Subjects</p>
        <p>{{ studentId }}</p>
        <table></table>
    </v-container>
</template>

<script>
    import UserService from '../services/user.service';
    export default {
        name: "subjects",
        data() {
            return {
                studentId: this.$route.params.id,
                student
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
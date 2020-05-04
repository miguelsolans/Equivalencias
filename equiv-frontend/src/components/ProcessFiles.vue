<template>
    <v-container>
        <ul>
            <li v-for="file in files" :key="file.filename">
                <a :href="`http://localhost:3030/processo/${file._id}/file/${file.filename}`" target="_blank">{{ file.generatedAt }}</a>
<!--                <a href="http://localhost:3030/processo/{{file._id}}/file/{{file.filename}}">{{ file.generatedAt }}</a>-->
            </li>
        </ul>

    </v-container>
</template>

<script>
    import UserService from '../services/user.service';
    export default {
        name: "ProcessFiles",
        data() {
            return {
                files: null,
                processId: this.$route.params.id
            }
        },
        mounted() {
            UserService.getProcessFiles( this.processId )
                .then(response => {
                    this.files = response.data
                }).catch(err => console.log(err));

        }
    }
</script>

<style scoped>

</style>
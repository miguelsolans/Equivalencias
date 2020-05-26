<template>
    <v-container>
        <div v-if="files.length > 0">
            <v-card>
                <v-list two-line>
                    <template v-for="(file, index) in files">
                        <v-list-item :key="file.filename" :href="`http://${url}/processo/${file._id}/file/${file.filename}`" target="_blank">
                            <v-list-item-avatar>
                                <v-icon>mdi-file-pdf</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    <span>Data: </span>
                                    {{ file.generatedAt | moment('DD/MM/YYYY, HH:MM')}}
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <span>Gerado Por: </span>
                                    {{ file.generatedBy }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider :key="index"></v-divider>
                    </template>
                </v-list>
            </v-card>

<!--            <ul v-if="files.length > 0">-->
<!--                <li v-for="file in files" :key="file.filename">-->
<!--                    <a :href="`http://localhost:3030/processo/${file._id}/file/${file.filename}`" target="_blank">{{ file.generatedAt }}</a>-->
<!--                </li>-->
<!--            </ul>-->
        </div>
        <div v-else>
            Não existem documentos
        </div>

    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    export default {
        name: "ProcessFiles",
        data() {
            return {
                files: [],
                url: process.env.VUE_APP_API_SERVER,
                processId: this.$route.params.id
            }
        },
        mounted() {
            UserService.getProcessFiles( this.processId )
                .then(response => {
                    console.log("GET Files");
                    console.log(response.data);
                    this.files = response.data
                }).catch(err => console.log(err));

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
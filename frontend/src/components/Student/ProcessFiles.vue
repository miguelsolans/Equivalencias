<template>
    <v-container>
        <v-btn @click="generatePdf"></v-btn>
        <div v-if="files.length > 0">
            <v-card>
                <v-list two-line>
                    <template v-for="(file, index) in files">
<!--                        <v-list-item :key="file.filename" :href="`http://${url}/processo/${file._id}/file/${file.filename}`" >-->
                        <v-list-item :key="file.filename" @click="downloadFile(file)">

                        <v-list-item-avatar>
                                <v-icon>mdi-file-pdf</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    <span>Data e Hora de Criação: </span>
                                    {{ file.generatedAt | moment('DD/MM/YYYY, HH:mm')}}
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <span>Utilizador Responsável: </span>
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
            Não existem Documentos
        </div>

    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    import Alert from '../../models/alert';

    export default {
        name: "ProcessFiles",
        data() {
            return {
                files: [],
                alert: new Alert(),
                url: process.env.VUE_APP_API_SERVER,
                processId: this.$route.params.id
            }
        },
        mounted() {
            this.getFiles();
        },
        methods: {
            generatePdf() {
                UserService.generatePdf( this.processId )
                    .then(response => {
                        this.files.push(response.data.file);
                    })
                    .catch(err => console.log(err.response));
            },

            getFiles() {
                UserService.getProcessFiles( this.processId )
                    .then(response => this.files.push(...response.data))
                    .catch(err => {
                        // let { title, message } = err.data;
                        this.alert = new Alert();
                        console.log(err.response)
                    });
            },

            downloadFile(file) {
                console.log("downloadFile");
                UserService.downloadFile(this.processId, file.filename)
                    .then(response => {
                        let blob = new Blob([response.data], { type:   'application/pdf' } );
                        let link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = `${file.filename}.pdf`;
                        link.click();
                    })
                    .catch(err => {
                        let status = err.response.status
                        // let { title, message } = err.data;
                        //     constructor(code, title, message, stack, isError)  {

                        this.alert = new Alert(status, "Erro de Download", "O ficheiro requisitado não foi encontrado", err.response, true);

                        this.$emit("displayAlert", this.alert);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
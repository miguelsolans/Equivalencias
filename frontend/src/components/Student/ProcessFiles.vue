<template>
    <v-container>
        <v-btn @click="generatePdf"></v-btn>
        <div v-if="files.length > 0">
            <v-card>
                <v-list two-line >
                    <template v-for="(file, index) in visiblePages">
                        <v-list-item
                            class="d-none d-sm-flex"
                            :key="file.filename" 
                            @click="downloadFile(file)"
                        >
                            <v-list-item-avatar>
                                <v-icon>mdi-file-pdf</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    <span style="font-weight: bold">Data e Hora de Criação: </span>
                                    {{ file.generatedAt | moment('DD/MM/YYYY, HH:mm')}}
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <span 
                                        style="font-weight: bold"
                                    >
                                        Utilizador Responsável:
                                    </span>
                                    {{ file.generatedBy }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-title 
                                class="text-right align-self-center"
                            >
                                <span
                                    style="color:#187653; font-weight: bold"
                                >
                                    Download
                                </span>
                                <v-list-item-avatar>
                                    <v-icon color="#187653">mdi-download</v-icon>
                                </v-list-item-avatar>
                            </v-list-title>
                        </v-list-item>
                        <v-list-item
                            class="d-flex d-sm-none"
                            :key="file.filename" 
                            @click="downloadFile(file)"
                        >
                            <v-list-item-avatar>
                                <v-icon>mdi-file-pdf</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    <span style="font-weight: bold">Data e Hora: </span>
                                    {{ file.generatedAt | moment('DD/MM/YYYY, HH:mm')}}
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <span 
                                        style="font-weight: bold"
                                    >
                                        Utilizador:
                                    </span>
                                    {{ file.generatedBy }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-title 
                                class="text-right align-self-center"
                            >
                                <v-list-item-avatar>
                                    <v-icon color="#187653">mdi-download</v-icon>
                                </v-list-item-avatar>
                            </v-list-title>
                        </v-list-item>
                        <v-divider :key="index"></v-divider>
                    </template>
                </v-list>
            </v-card>
            <div class="my-5 text-center pt-2">
                <v-pagination
                    color="#187653" 
                    v-model="page"
                    :length="Math.ceil(files.length/itemsPerPage)"
                    circle
                ></v-pagination>
            </div>
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
                page: 1,
                itemsPerPage: 5,
                files: [],
                alert: new Alert(),
                url: process.env.VUE_APP_API_SERVER,
                processId: this.$route.params.id
            }
        },
        mounted() {
            this.getFiles();
        },
        computed: {
            visiblePages () {
                return this.files.slice((this.page - 1)* this.itemsPerPage, this.page* this.itemsPerPage)
            }
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
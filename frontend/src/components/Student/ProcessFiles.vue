<template>
    <v-container>
        <v-btn @click="generatePdf"></v-btn>
        <div v-if="files.length > 0">
            <v-card>
                <v-list two-line>
                    <template v-for="(file, index) in visiblePages">
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
            <div class="my-5 text-center pt-2">
                <v-pagination
                    color="#187653" 
                    v-model="page"
                    :length="Math.ceil(files.length/perPage)"
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
    export default {
        name: "ProcessFiles",
        data() {
            return {
                page: 1,
                perPage: 5,
                files: [],
                url: process.env.VUE_APP_API_SERVER,
                processId: this.$route.params.id
            }
        },
        mounted() {
            this.getFiles();
        },
        computed: {
            visiblePages () {
                return this.files.slice((this.page - 1)* this.perPage, this.page* this.perPage)
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
                    .catch(err => console.log(err));
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
                    .catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
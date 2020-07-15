<template>
    <v-container>
        <v-form
            class="my-5"
        >
            <v-row>
                <v-col cols="6" sm="6">
                    <v-text-field 
                        color="#187653"
                        label="Identificador do Processo"
                        v-model="process.processo"
                        class="ml-md-5"
                        dense
                        filled
                        rounded
                        hide-details
                        :disabled="readOnly"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6">
                    <v-text-field 
                        color="#187653"
                        label="Identificador do Aluno"
                        v-model="process.idAluno"
                        class="ml-md-5"
                        dense
                        filled
                        rounded
                        hide-details
                        :disabled="readOnly"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-text-field 
                color="#187653"
                label="Nome do Aluno"
                v-model="process.nomeAluno"
                class="ml-md-5"
                dense
                filled
                rounded
                hide-details
                :disabled="readOnly"
            ></v-text-field>
            <v-text-field 
                color="#187653"
                label="Instituição Proveniente"
                v-model="process.instProv"
                class="ml-md-5 mt-3"
                dense
                filled
                rounded
                hide-details
                :disabled="readOnly"
            ></v-text-field>
            <v-text-field 
                color="#187653"
                label="Curso Proveniente"
                v-model="process.cursoProv"
                class="ml-md-5 mt-3"
                dense
                filled
                rounded
                hide-details
                :disabled="readOnly"
            ></v-text-field>
            <v-row class="text-right d-none d-sm-flex">
                <v-col>
                    <v-switch
                        color="#187653" 
                        v-model="readOnly"
                        class="ml-md-5 my-5"
                        label="Modo de Leitura"
                    />
                </v-col>
                <v-col class="my-2">
                    <v-btn
                        rounded
                        class="ml-5"
                        color="#187653"
                        dark
                    >
                        <div class="text-capitalize mx-1">
                            <strong>Salvar Alterações</strong>
                        </div>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="text-right d-flex d-sm-none">
                <v-col>
                    <v-switch
                        color="#187653" 
                        v-model="readOnly"
                        class="ml-md-5 my-5"
                        label="Modo de Leitura"
                    />
                </v-col>
                <v-col class="my-2">
                    <v-btn
                        rounded
                        class="ml-5"
                        color="#187653"
                        dark
                        fab
                        small
                    >
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </v-col>
            </v-row>                    
            <!-- constructor(processo, idAluno, nomeAluno, instProv, cursoProv) -->
        </v-form>
    </v-container>
</template>

<script>
    // import UserService from '../services/user.service';

    export default {
        name: "StudentInfo",
        props: ["process"],
        data() {
            return {
                // process: null,
                processId: this.$route.params.id,
                readOnly: true
            }
        },
        mounted() {
            console.log("init data component");
            // UserService.getProcess(this.processId)
            //     .then(response => {
            //
            //         this.process = response.data;
            //     }).catch(err => {
            //         // TODO: Do something with error
            //         console.log(err);
            // })
        }
    }
</script>

<style scoped>
    .avatar {
        max-width: 150px;
    }
</style>
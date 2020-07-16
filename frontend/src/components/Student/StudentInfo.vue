<template>
    <v-container>
        <v-form>
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
                    />
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
                    />
                </v-col>
            </v-row>
            <v-text-field color="#187653" label="Nome do Aluno" v-model="process.nomeAluno" class="ml-md-5" dense filled rounded hide-details :disabled="readOnly"/>
            <v-autocomplete color="#187653" v-model="process.instProv" placeholder="Instituição Proveniente" type="text" :items="universities" item-text="nomeInstit" @change="universityChosen" class="ml-md-5 mt-3" dense filled rounded hide-details :disabled="readOnly"/>
            <v-autocomplete color="#187653" v-if="!temp && !course.doesntExist" v-model="process.cursoProv" placeholder="Curso Proveniente" :items="course.courses" item-text="cursoProv" class="ml-md-5 mt-3" dense filled rounded :disabled="readOnly"/>
            <v-text-field color="#187653" v-else-if="temp || course.doesntExist" placeholder="Curso Proveniente" v-model="process.cursoProv" class="ml-md-5 mt-3" dense filled rounded :disabled="readOnly"/>
            <v-row class="text-right d-none d-sm-flex">
                <v-col cols="3">
                    <v-switch 
                        color="#187653" 
                        v-model="readOnly" 
                        class="ml-md-5 my-2" 
                        label="Modo de Leitura"
                    />
                </v-col>
                <v-col cols="3">
                    <v-switch 
                        color="#187653"
                        v-model="course.doesntExist" 
                        class="ml-md-5 my-2" 
                        label="Curso Inexistente" 
                        :disabled="readOnly"
                    />
                </v-col>
                <v-col cols="6" class="my-2">
                    <v-btn rounded class="ml-5" color="#187653" dark @click="updateProcess">
                        <div class="text-capitalize mx-1">
                            <strong>Salvar Alterações</strong>
                        </div>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="text-right d-flex d-sm-none">
                <v-col cols="4">
                    <v-switch 
                        color="#187653" 
                        v-model="readOnly" 
                        class="ml-md-5 my-2" 
                        label="Modo de Leitura"
                    />
                </v-col>
                <v-col cols="4">
                    <v-switch 
                        color="#187653"
                        v-model="course.doesntExist" 
                        class="ml-md-5 my-2" 
                        label="Curso Inexistente" 
                        :disabled="readOnly"
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
                        @click="updateProcess"
                    >
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
        <v-dialog v-model="updatedInfoProcess" persistent max-width="350">
            <v-card>
                <v-card-title class="headline">Processo Atualizado</v-card-title>
                <v-card-text>As novas informações para o Processo em causa foram submetidas com sucesso.</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="green darken-1" text @click="updatedInfoProcess = false">Voltar Atrás</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    export default {
        name: "StudentInfo",
        props: ["process"],
        data() {
            return {
                updatedInfoProcess: false,
                processId: this.$route.params.id,
                readOnly: true,
                temp: true,
                universities: [],
                course: {
                    disableAutocomplete: true,
                    doesntExist: false,
                    enableInput: false,
                    courses: []
                },
            }
        },
        mounted() {
            console.log("init data component");
            this.fetchUniversities();
        },
        methods: {
            fetchUniversities() {
                UserService.listUniversities()
                    .then(response => {
                        this.universities.push(...response.data);
                    }).catch(err => console.log(err));
            },
            universityChosen() {
                console.log(`${this.process.instProv}`);

                UserService.getUniversityCourses(this.process.instProv)
                    .then(result => {
                        console.log(result);
                        this.course.courses = result.data;

                        if(this.course.courses.length > 0) {
                            console.log("Courses Available");
                            this.temp = false;
                            this.course.doesntExist = false;
                        } else {
                            console.log("No Courses... Please input a new one");
                            this.temp = true;
                            this.course.doesntExist = true;
                        }
                    }).catch(err => console.log(err));
            },
            updateProcess(e) {
                e.preventDefault();

                UserService.updateProcess(this.processId, this.process)
                    .then(response => console.log(response.data))
                    .catch(err => console.log(err));
                
                this.updatedInfoProcess = true;
            }
        }
    }
</script>

<style scoped>
    .avatar {
        max-width: 150px;
    }
</style>
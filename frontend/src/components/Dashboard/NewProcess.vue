<template>
    <v-container>
        <v-row no-gutters class="ml-md-5">
            <v-col cols="1">                
                <v-avatar size="55px"><img src="../../assets/images/NewProcess.png" alt="Avatar para o processo"/></v-avatar>
            </v-col>
            <v-col class="ml-8">
                <h3 style="color: #187653">Registar Novo Processo Equivalência</h3>
                <p>Complete os dados para criar um novo Processo</p>
            </v-col>
        </v-row>

        <v-form class="my-9">
            <v-row>
                <v-col cols="6" sm="6">
                    <v-text-field color="#187653" placeholder="Identificador do Processo" type="text" v-model="student.processo" class="ml-md-5" dense filled rounded hide-details required/>
                </v-col>
                <v-col cols="6" sm="6">
                    <v-text-field color="#187653" placeholder="Identificador do Aluno" type="text" v-model="student.idAluno" class="ml-md-5" dense filled rounded hide-details required/>
                </v-col>
            </v-row>
            <v-text-field color="#187653" placeholder="Nome Completo do Aluno" type="text" v-model="student.nomeAluno" class="ml-md-5" dense filled rounded hide-details required/>
            <v-autocomplete color="#187653" v-model="student.instProv" placeholder="Instituição Proveniente" type="text" :items="universities" item-text="nomeInstit" @change="universityChosen" class="ml-md-5 mt-3" dense filled rounded hide-details/>
            <v-autocomplete color="#187653" v-if="!course.enableInput && !course.doesntExist" v-model="student.cursoProv" placeholder="Curso Proveniente" :items="course.courses" item-text="cursoProv" :disabled="course.disableAutocomplete" class="ml-md-5 mt-3" dense filled rounded/>
            <v-text-field color="#187653" v-else-if="course.enableInput || course.doesntExist" placeholder="Curso Proveniente" v-model="student.cursoProv" class="ml-md-5 mt-3" dense filled rounded/>

            <v-row class="text-right d-none d-sm-flex">
                <v-col>
                    <v-switch color="#187653" v-model="course.doesntExist" class="ml-md-5 my-2" label="Curso Inexistente"/>
                </v-col>
                <v-col class="my-2">
                    <v-btn rounded class="ml-5" color="#187653" dark @click="handleSubmit">
                        <div class="text-capitalize mx-1">
                            <strong>Criar Processo</strong>
                        </div>
                    </v-btn>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn rounded class="ml-5" color="#39c087" dark fab small v-on="on" @click="resetForm">
                                <v-icon>mdi-delete-empty</v-icon>
                            </v-btn>
                        </template>
                        <span>Limpar Dados</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="text-right d-flex d-sm-none">
                <v-col>
                    <v-switch color="#187653" v-model="course.doesntExist" class="ml-md-5 my-2" label ="Curso Inexistente"/>
                </v-col>
                <v-col class="my-2">
                    <v-btn rounded class="ml-5" color="#187653" dark fab small @click="handleSubmit">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn rounded class="ml-5" color="#39c087" dark fab small @click="resetForm">
                        <v-icon>mdi-delete-empty</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <v-dialog v-model="noProcessAlert" persistent max-width="350">
            <v-card>
                <v-card-title class="headline">Processo Inexistente</v-card-title>
                <v-card-text>Por favor preencha todos os campos pedidos antes de tentar submeter o Processo.</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="green darken-1" text @click="noProcessAlert = false">Voltar Atrás</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="newProcessAlert" persistent max-width="350">
            <v-card>
                <v-card-title class="headline">Novo Processo Criado</v-card-title>
                <v-card-text>O Processo solicitado foi submetido com sucesso.</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="green darken-1" text @click="newProcessAlert = false">Voltar ao    Início</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>

</template>

<script>

    import Processo from '../../models/processo';
    import UserService from '../../services/user.service';

    export default {
        name: "NewProcess",
        data() {
            return {
                noProcessAlert: false,
                newProcessAlert: false,
                course: {
                    disableAutocomplete: true,
                    doesntExist: false,
                    enableInput: false,
                    courses: []
                },
                universities: null,
                student: new Processo('', '', '', '', '')
            }
        },
        mounted() {
            this.init();

        },
        methods: {
            init() {
                UserService.listUniversities()
                    .then(result => this.universities = result.data)
                    .catch(err => console.log(err));
            },

            handleSubmit(e) {
                e.preventDefault();

                UserService.newProcess(this.student)
                    .then(response => {
                        console.log(response);

                        if(response.data.errors) {
                            this.noProcessAlert = true;
                        } else {
                            this.$root.$emit('newProcess', this.student);
                            this.resetForm();
                            this.newProcessAlert = true;
                        }
                    })
                    .catch(err => console.log(err.response));
            },
            universityChosen() {
                console.log(`${this.student.instProv}`);

                UserService.getUniversityCourses(this.student.instProv)
                    .then(result => {
                        console.log(result);
                        this.course.courses = result.data;

                        if(this.course.courses.length > 0) {
                            this.course.disableAutocomplete = false;
                        } else {
                            console.log("No Courses... Please input a new one");
                            this.course.disableAutocomplete = false;
                            this.course.enableInput = true;
                        }
                    }).catch(err => console.log(err));

            },
            resetForm() {
                this.student = new Processo();
                this.course.courses = [];
                this.course.disableAutocomplete = true;
                this.course.enableInput = false;
            }
        }
    }

</script>

<style scoped>

</style>
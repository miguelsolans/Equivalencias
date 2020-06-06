<template>
    <v-container>
        <h3 class="ml-md-5">Registar Novo Processo Equivalência</h3>
        <p class="ml-md-5">Complete os dados para criar um novo Processo</p>

        <v-form class="my-10">
            <v-text-field 
                color="#197855"
                placeholder="Identificador do Processo" 
                type="text" 
                v-model="student.processo" 
                class="ml-md-5"
                required
                hide-details
            ></v-text-field>
            <v-text-field 
                color="#197855"
                placeholder="Identificador do Aluno" 
                type="text" v-model="student.idAluno" 
                class="ml-md-5"
                required
                hide-details
            ></v-text-field>
            <v-text-field 
                color="#197855"                
                placeholder="Nome Completo do Aluno" 
                type="text" 
                v-model="student.nomeAluno" 
                class="ml-md-5"
                required
                hide-details
            ></v-text-field>

<!--            <v-text-field placeholder="Instituição Proveninente" type="text" v-model="student.instProv" required></v-text-field>-->

            <v-autocomplete 
                color="#197855"
                v-model="student.instProv" 
                placeholder="Instituição Proveniente" 
                type="text" 
                :items="universities" 
                item-text="nomeInstit" 
                @change="universityChosen"
                class="ml-md-5"
                hide-details
            ></v-autocomplete>

            <v-autocomplete 
                color="#197855"
                v-if="!course.enableInput && !course.doesntExist" 
                v-model="student.cursoProv" 
                placeholder="Curso Proveniente" 
                :items="course.courses" 
                item-text="cursoProv" 
                :disabled="course.disableAutocomplete"
                class="ml-md-5"
            ></v-autocomplete>
            <v-text-field
                color="#197855"
                v-else-if="course.enableInput || course.doesntExist" 
                placeholder="Curso Proveniente" 
                v-model="student.cursoProv"
                class="ml-md-5"
            ></v-text-field>
            
            <v-row class="text-right d-none d-sm-flex">
                <v-col>
                    <v-checkbox 
                        color="#197855" 
                        v-model="course.doesntExist" 
                        class="ml-md-5 my-2" 
                        label ="Curso Inexistente"
                    />
                </v-col>
                <v-col class="my-2">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                rounded
                                class="ml-5" 
                                color="#197855"
                                dark
                                v-on="on"
                                @click="handleSubmit"
                            >
                                <text-area
                                    class="text-capitalize
                                    mx-1"
                                >
                                    <strong>Criar Processo</strong>
                                </text-area>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <span>Criar Processo</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                rounded
                                class="ml-5" 
                                color="#39c087"
                                dark
                                fab
                                small
                                v-on="on"
                                @click="resetForm"
                            >
                                <v-icon>mdi-delete-empty</v-icon>
                            </v-btn>
                        </template>
                        <span>Limpar Dados</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="text-right d-flex d-sm-none">
                <v-col>
                    <v-checkbox 
                        color="#197855"
                        v-model="course.doesntExist" 
                        class="ml-5 my-2" 
                        label ="Curso Inexistente"
                    />
                </v-col>
                <v-col class="my-2">
                    <v-btn
                        rounded
                        class="ml-5" 
                        color="#197855"
                        dark
                        fab
                        small
                        @click="resetForm"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                        rounded
                        class="ml-5" 
                        color="#39c087"
                        dark
                        fab
                        small
                        @click="resetForm"
                    >
                        <v-icon>mdi-delete-empty</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>

</template>

<script>

    import Processo from '../../models/processo';
    import UserService from '../../services/user.service';

    export default {
        name: "ListaProcessos",
        data() {
            return {
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
                            alert("HANDLE ERROR");
                        } else {
                            this.$root.$emit('newProcess', this.student);

                            this.resetForm();

                        }
                    })
                    .catch(err => console.log(err));
            },
            universityChosen() {
                console.log(`${this.student.instProv}`);
                // this.course.disable = false;

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

    .container {
        max-width: autocomplete;
    }

</style>
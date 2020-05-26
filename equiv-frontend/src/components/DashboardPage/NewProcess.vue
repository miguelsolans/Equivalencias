<template>
    <v-container>
        <v-row align="center">
            <h2 class="text-center">Novo Processo</h2>
        </v-row>
        <v-form>
            <v-text-field label="Identificador do Processo" type="text" v-model="student.processo" required></v-text-field>

            <v-text-field label="Identificador do Aluno" type="text" v-model="student.idAluno" required></v-text-field>

            <v-text-field label="Nome Completo do Aluno" type="text" v-model="student.nomeAluno" required></v-text-field>

<!--            <v-text-field label="Instituição Proveninente" type="text" v-model="student.instProv" required></v-text-field>-->

            <v-autocomplete v-model="student.instProv" label="Instituição Proveniente" type="text" :items="universities" item-text="nomeInstit" @change="universityChosen"></v-autocomplete>

            <v-autocomplete v-if="!course.enableInput && !course.doesntExist" v-model="student.cursoProv" label="Curso Proveniente" :items="course.courses" item-text="cursoProv" :disabled="course.disableAutocomplete"></v-autocomplete>
            <v-text-field v-else-if="course.enableInput || course.doesntExist" label="Curso Proveniente" v-model="student.cursoProv"></v-text-field>
            <v-checkbox color="warning" v-model="course.doesntExist" class="mx-2" label="Curso ainda não existe"></v-checkbox>

            <!--            <v-text-field label="Curso Proveninente" type="text" v-model="student.cursoProv" required :disabled="true"></v-text-field>-->

            <v-btn color="teal" dark @click="handleSubmit">Criar</v-btn>
            <v-divider  class="mx-4" inset vertical></v-divider>
            <v-btn color="normal" @click="resetForm">Cancelar</v-btn>
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
        max-width: 700px;
    }
</style>
<template>
    <v-container>
        <h5 class="text-left my-3 mx-3">* Campos de preenchimento obrigatório</h5>
        <v-form>
            <v-row class="d-none d-sm-flex">
                <v-col cols="6" sm="6">
                    <v-text-field 
                        color="#187653" 
                        label="Identificador do Processo *" 
                        v-model="process.processo" 
                        dense 
                        filled 
                        rounded 
                        hide-details 
                        :disabled="readOnly"
                        clearable
                    />
                </v-col>
                <v-col cols="6" sm="6">
                    <v-text-field 
                        color="#187653" 
                        label="Identificador do Aluno *" 
                        v-model="process.idAluno" 
                        dense 
                        filled 
                        rounded 
                        hide-details 
                        :disabled="readOnly"
                        clearable
                    />
                </v-col>
            </v-row>
            <v-text-field
                class="d-flex d-sm-none"
                color="#187653" 
                label="Identificador do Processo *" 
                v-model="process.processo" 
                dense 
                filled 
                rounded 
                hide-details 
                :disabled="readOnly"
                clearable
            />
            <v-text-field
                class="d-flex d-sm-none mt-3"
                color="#187653" 
                label="Identificador do Aluno *" 
                v-model="process.idAluno" 
                dense 
                filled 
                rounded 
                hide-details 
                :disabled="readOnly"
                clearable
            />
            <v-text-field
                class="d-flex d-sm-none mt-3"
                color="#187653" 
                label="Nome do Aluno *" 
                v-model="process.nomeAluno" 
                dense
                filled
                rounded
                hide-details
                :disabled="readOnly"
                clearable
            />
            <v-text-field
                class="d-none d-sm-flex"
                color="#187653" 
                label="Nome do Aluno *" 
                v-model="process.nomeAluno" 
                dense
                filled
                rounded
                hide-details
                :disabled="readOnly"
                clearable
            />
            <v-autocomplete
                color="#187653"
                v-model="process.instProv"
                label="Instituição Proveniente *" 
                type="text"
                :items="universities"
                item-text="nomeInstit"
                @change="universityChosen"
                class="mt-3"
                dense
                filled
                rounded
                hide-details
                :disabled="readOnly"
                clearable
            />
            <v-autocomplete
                color="#187653"
                label="Curso Proveniente *" 
                v-if="!temp
                &&
                !course.doesntExist"
                v-model="process.cursoProv"
                :items="course.courses"
                item-text="cursoProv"
                class="mt-3"
                dense
                filled
                rounded
                :disabled="readOnly"
                clearable
            />
            <v-text-field 
                color="#187653"
                label="Curso Proveniente *" 
                v-else-if="temp || course.doesntExist" 
                v-model="process.cursoProv" 
                class="mt-3"
                dense
                filled
                rounded
                :disabled="readOnly"
                clearable
            />
            <v-row class="text-right d-none d-sm-flex">
                <v-col cols="3">
                    <v-switch 
                        color="#187653" 
                        v-model="readOnly" 
                        class="my-2" 
                        label="Modo de Leitura"
                    />
                </v-col>
                <v-col cols="3">
                    <v-switch 
                        color="#187653"
                        v-model="course.doesntExist" 
                        class="my-2" 
                        label="Curso Inexistente" 
                        :disabled="readOnly"
                    />
                </v-col>
                <v-col cols="6">
                    <v-btn rounded class="ml-5" color="#187653" :dark="!readOnly" @click="updateProcess" :disabled="readOnly">
                        <div class="text-capitalize mx-1">
                            <strong>Guardar Alterações</strong>
                        </div>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="text-right d-flex d-sm-none">
                <v-col cols="4">
                    <v-switch 
                        color="#187653" 
                        v-model="readOnly" 
                        class="my-2" 
                        label="Modo de Leitura"
                    />
                </v-col>
                <v-col cols="4">
                    <v-switch 
                        color="#187653"
                        v-model="course.doesntExist" 
                        class="my-2" 
                        label="Curso Inexistente" 
                        :disabled="readOnly"
                    />
                </v-col>
                <v-col class="my-2">
                    <v-btn
                        :disabled="readOnly"
                        rounded 
                        class="ml-5" 
                        color="#187653" 
                        :dark="!readOnly"
                        fab
                        small
                        @click="updateProcess"
                    >
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <v-dialog v-model="alert.display" retain-focus persistent max-width="350">
            <v-card style="font-family: Rubik, sans-serif;">
                <v-card-title style="font-weight: bold;" class="justify-center">
                    {{alert.title}}
                </v-card-title>
                <v-card-text class="text-justify">{{alert.message}}</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="#187653" text @click="alert.hideAlert()"><b>Fechar</b></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    import Alert from "../../models/alert";

    export default {
        name: "StudentInfo",
        props: ["process"],
        data() {
            return {
                alert: new Alert(0, "", "", {}, false),

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
                    .then(response => {
                        this.createAlert("Processo Atualizado", `O Processo ${this.process.processo} foi atualizado com sucesso.`);
                        console.log(response.data)
                    })
                    .catch(err => {
                        this.createAlert("Oops!...", `Não foi possível atualizar o Processo ${this.process.processo}.`);

                        console.log(err)
                    });
                
                this.updatedInfoProcess = true;
            },

            createAlert(title, message) {
                this.alert.setTitle(title);
                this.alert.setMessage(message);

                this.alert.displayAlert();
            }
        }
    }
</script>

<style scoped>
    .avatar {
        max-width: 150px;
    }
</style>
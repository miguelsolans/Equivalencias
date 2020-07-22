<template>
    <v-container>
        <h5 class="ml-2 mt-5">* Campos de preenchimento obrigatório</h5>
        <v-form class="mt-5">
            <v-row class="d-none d-sm-flex">
                <v-col cols="md">
                    <v-text-field
                        color="#187653"
                        v-model="university.codInstit" 
                        label="Código da Instituição *" 
                        type="text"
                        dense
                        filled
                        rounded
                        required
                        clearable
                    />
                </v-col>
                <v-col cols="md">
                    <v-text-field
                        color="#187653"
                        v-model="university.nomeInstit" 
                        label="Nome da Instituição *" 
                        type="text"
                        dense
                        filled
                        rounded
                        required
                        clearable
                    />
                </v-col>
                <div>
                    <v-col cols="md" class="text-right my-2">
                        <v-btn rounded align-center color="#187653" dark @click="handleSubmit">
                            <div class="text-capitalize">
                                <strong>Registar Instituição</strong>
                            </div>
                        </v-btn>
                    </v-col>
                </div>
            </v-row>
            <v-row class="d-flex d-sm-none">
                <v-text-field
                    color="#187653"
                    v-model="university.codInstit" 
                    label="Código da Instituição *" 
                    type="text"
                    dense
                    filled
                    rounded
                    required
                    clearable
                />
                <v-text-field
                    color="#187653"
                    v-model="university.nomeInstit" 
                    label="Nome da Instituição *" 
                    type="text"
                    dense
                    filled
                    rounded
                    required
                    clearable
                />
            </v-row>
            <div class="d-flex d-sm-none">
                <v-col cols="md" class="text-center">
                    <v-btn rounded color="#187653" dark @click="handleSubmit">
                        <div class="text-capitalize">
                            <strong>Registar Instituição</strong>
                        </div>
                    </v-btn>
                </v-col>
            </div>
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
    import University from '../../models/university';
    import Alert from '../../models/alert';
    export default {
        name: "NewFaculty",
        props: ["universities"],
        data() {
            return {
                alert: new Alert(0, "", "", {}, false),

                university: new University()
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                UserService.registerUniversity(this.university)
                    .then(response => {
                        console.log(response.data);

                        this.$emit('newUniversity', response.data);

                        this.createAlert("Instituição Criada", `A Instituição ${this.university.nomeInstit} foi adicionada com sucesso.`);

                        this.resetForm();
                    })
                    .catch(err => {
                        this.createAlert("Oops!...", "Houve um erro ao criar a Nova Instituição. Tente novamente mais tarde, verifique se o código da Instituição é único ou se todos os campos estão preenchidos.")
                        console.log(err.response.data)
                    });
            },

            createAlert(title, message) {
                this.alert.setTitle(title);
                this.alert.setMessage(message);

                this.alert.displayAlert();
            },

            resetForm() {
                this.university = new University();
            }
        }
    }
</script>

<style scoped>

</style>
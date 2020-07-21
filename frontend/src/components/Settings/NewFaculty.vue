<template>
    <v-container>
        <v-form>
            <v-row class="d-none d-sm-flex">
                <v-col cols="md">
                    <v-text-field
                        color="#187653"
                        v-model="university.codInstit" 
                        label="Código da Instituição" 
                        type="number"
                        dense
                        filled
                        rounded
                        required
                    />
                </v-col>
                <v-col cols="md">
                    <v-text-field
                        color="#187653"
                        v-model="university.nomeInstit" 
                        label="Nome da Instituição" 
                        type="text"
                        dense
                        filled
                        rounded
                        required
                    />
                </v-col>
                <div>
                    <v-col cols="md" class="text-right my-2">
                        <v-btn rounded align-center color="#187653" dark @click="handleSubmit">
                            <div class="text-capitalize">
                                <strong>Registar Faculdade</strong>
                            </div>
                        </v-btn>
                    </v-col>
                </div>
            </v-row>
            <v-row class="d-flex d-sm-none">
                <v-text-field
                    color="#187653"
                    v-model="university.codInstit" 
                    label="Código da Instituição" 
                    type="number"
                    dense
                    filled
                    rounded
                    required
                />
                <v-text-field
                    color="#187653"
                    v-model="university.nomeInstit" 
                    label="Nome da Instituição" 
                    type="text"
                    dense
                    filled
                    rounded
                    required
                />
            </v-row>
            <div class="d-flex d-sm-none">
                <v-col cols="md" class="text-center">
                    <v-btn rounded color="#187653" dark @click="handleSubmit">
                        <div class="text-capitalize">
                            <strong>Registar Faculdade</strong>
                        </div>
                    </v-btn>
                </v-col>
            </div>
        </v-form>

        <v-dialog v-model="alert.display" persistent max-width="350">
            <v-card>
                <v-card-title class="justify-center">{{alert.title}}</v-card-title>
                <v-card-text  class="text-justify">{{alert.message}}</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="green darken-1" text @click="alert.hideAlert()">Fechar</v-btn>
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

                        this.createAlert("Faculdade Adicionada", `A Faculdade ${this.university.nomeInstit} foi adicionada com sucesso`);

                        this.resetForm();
                    })
                    .catch(err => {
                        this.createAlert("Erro!", "Não foi possível registar a faculdade. Verifique se o código da faculdade é único.")
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
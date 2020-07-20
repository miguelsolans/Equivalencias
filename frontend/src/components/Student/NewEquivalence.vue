<template>
    <v-container>
        <v-form>
            <v-container v-if="!manualInput">
                <v-row>
                    <v-col cols="6" sm="6">
                        <v-autocomplete
                            color="#187653"
                            v-model="equivalencia.ucRealizada" 
                            label="UC Realizada" 
                            type="text" 
                            :items="ucOrigem" 
                            item-text="ucRealizada"
                            @change="subjectChosen"
                            dense
                            filled 
                            rounded 
                            :rules="[v => !!v || 'Especifique o nome da UC realizada']" 
                            hide-details
                        />
                    </v-col>
                    <v-col cols="6" sm="6">
                        <v-autocomplete
                            color="#187653"
                            :disabled="disabledInput"
                            label="UC Equivalente"
                            v-model="equivalencia.ucEquiv"
                            type="text"
                            :items="ucDestino"
                            item-text="ucEquiv"
                            dense 
                            filled 
                            rounded
                            hide-details
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" sm="6">
                        <v-text-field
                            class="mb-2"
                            color="#187653"
                            label="Ano Letivo de Conclusão" 
                            v-model="equivalencia.anoLetivo" 
                            :rules="[v => /[0-9]{4}\/[0-9]{4}/.test(v) || 'Especifique o ano de conclusão da UC realizada corretamente (XXXX/XXXX)']"
                            dense
                            filled
                            rounded
                        />
                    </v-col>
                    <v-col cols="6" sm="6">
                        <v-select
                            color="#187653"
                            label="Semestre da UC Equivalente" 
                            v-model="equivalencia.semUcEquiv" 
                            :items="['1º Semestre', '2º Semestre']" 
                            :rules="[v => !!v || 'Escolha o semestre da UC equivalente']" 
                            dense
                            filled
                            rounded
                            hide-details
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" sm="4">
                        <v-text-field
                            color="#187653" 
                            label="Nota Obtida" 
                            v-model="equivalencia.nota" 
                            :rules="gradeRules"
                            dense
                            filled
                            rounded
                        />
                    </v-col>
                    <v-col cols="4" sm="4">
                        <v-text-field
                            color="#187653"
                            label="ECTS" 
                            v-model="equivalencia.ects" 
                            :disabled="disabledInput" 
                            :rules="[v => /[0-9]/.test(v) || 'Deve especificar os créditos da UC realizada']"
                            dense
                            filled
                            rounded
                        />
                    </v-col>
                    <v-col cols="4" sm="4">
                        <v-text-field
                            color="#187653"
                            label="Percentagem da Equivalência" 
                            v-model="equivalencia.percent" 
                            :disabled="disabledInput" 
                            :rules="[v => /[0-9]{1,3}/.test(v) || 'Especifique a percentagem de 0% a 100%']"
                            append-icon="%"
                            dense
                            filled
                            rounded
                        />
                    </v-col>
                </v-row>
            </v-container>

            <!-- Without Autocomplete -->
            <v-container v-else>
                <v-row>
                    <v-col cols="6" sm="6">
                        <v-text-field
                            color="#187653"
                            v-model="equivalencia.ucRealizada" 
                            label="UC Realizada" 
                            type="text" 
                            :items="ucOrigem" 
                            item-text="ucRealizada"
                            @change="subjectChosen"
                            dense
                            filled 
                            rounded 
                            :rules="[v => !!v || 'Especifique o nome da UC realizada']" 
                            hide-details
                        />
                    </v-col>
                    <v-col cols="6" sm="6">
                        <v-text-field
                            color="#187653"
                            label="UC Equivalente"
                            v-model="equivalencia.ucEquiv"
                            type="text"
                            :items="ucDestino"
                            item-text="ucEquiv"
                            dense 
                            filled 
                            rounded
                            hide-details
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" sm="6">
                        <v-text-field
                            class="mb-2"
                            color="#187653"
                            label="Ano Letivo de Conclusão" 
                            v-model="equivalencia.anoLetivo"
                            :rules="[v => /[0-9]{4}\/[0-9]{4}/.test(v) || 'Especifique o ano de conclusão da UC realizada corretamente (XXXX/XXXX)']"
                            dense
                            filled
                            rounded
                        />
                    </v-col>
                    <v-col cols="6" sm="6">
                        <v-select color="#187653" label="Semestre da UC Equivalente"
                                v-model="equivalencia.semUcEquiv"
                                :items="['1º Semestre', '2º Semestre']"
                                :rules="[v => !!v || 'Escolha o semestre da UC equivalente']"
                                dense
                                filled
                                rounded
                                hide-details
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" sm="4">
                        <v-text-field
                            color="#187653" 
                            label="Nota Obtida" 
                            v-model="equivalencia.nota" 
                            :rules="gradeRules"
                            dense
                            filled
                            rounded
                        />
                    </v-col>
                    <v-col cols="4" sm="4">
                        <v-text-field
                            color="#187653"
                            label="ECTS" 
                            v-model="equivalencia.ects" 
                            :disabled="disabledInput"
                            :rules="[v => /[0-9]/.test(v) || 'Deve especificar os créditos da UC realizada']"
                            dense
                            filled
                            rounded
                        />
                    </v-col>
                    <v-col cols="4" sm="4">
                        <v-text-field
                            color="#187653"
                            label="Percentagem da Equivalência" 
                            v-model="equivalencia.percent" 
                            :disabled="disabledInput"
                            :rules="[v => /[0-9]{1,3}/.test(v) || 'Especifique a percentagem de 0% a 100%']"
                            dense
                            filled
                            rounded
                        />
                    </v-col>
                </v-row>
            </v-container>

            <v-row class="text-right d-none d-sm-flex">
                <v-col cols="6">
                    <v-switch
                        color="#187653" 
                        v-model="manualInput"
                        class="ml-3 my-2"
                        label="Inserção Manual"
                    />
                </v-col>
                <v-col cols="6">
                    <v-btn
                        class="mr-3"
                        rounded
                        color="#187653"
                        dark
                        @click="handleSubmit"
                    >
                        <div class="text-capitalize mx-1">
                            <strong>Criar Equivalência</strong>
                        </div>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="text-right d-flex d-sm-none">
                <v-col cols="6">
                    <v-switch
                        color="#187653" 
                        v-model="manualInput"
                        class="ml-3 my-2"
                        label="Inserção Manual"
                    />
                </v-col>
                <v-col cols="6">
                    <v-btn
                        rounded
                        class="mr-3"
                        color="#187653"
                        dark
                        fab
                        small
                        @click="handleSubmit"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>   
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
    import Equivalencia from '../../models/equivalencia';
    import UserService from '../../services/user.service';
    import Alert from "../../models/alert";
    export default {
        name: "NewEquivalence",
        props: ["process"],
        data() {
            return {
                alert: new Alert(0, "", "", {}, false),

                processId: this.$route.params.id,
                equivalencia: new Equivalencia(),
                ucOrigem: null,
                ucDestino: [],
                disabledInput: true,
                manualInput: false,

                // Form Rules
                valid: false,
                gradeRules: [
                    v => !!v || "Especifique a nota atribuída a UC realizada",
                    v => v >= 10 || "Nota não deve ser abaixo de 10 valores",
                    v => v <= 20 || "Nota não deve ser acima de 20 valores"
                ]
            }
        },
        mounted() {
            // Fetch University coming course subjects
            this.fetchSubjects(this.process.instProv, this.process.cursoProv);

            // Fetch University of Minho MIEI Courses
        },
        methods: {
            subjectChosen() {
                console.group("Subject Chosen");

                console.log(`Subject Chosen ${this.equivalencia.ucRealizada}`);
                let params = {
                    instProv: this.process.instProv,
                    cursoProv: this.process.cursoProv,
                    ucRealizada: this.equivalencia.ucRealizada
                };

                console.log(params);
                UserService.getSubject(this.process.instProv, this.process.cursoProv, this.equivalencia.ucRealizada)
                    .then(response => {
                        let data = response.data;
                        if(data.length > 0) {
                            console.log("Updating...");
                            console.log(data);
                            this.ucDestino.push(... data);
                            this.equivalencia.ects = data.ects;
                            this.disabledInput = false;
                        } else {
                            this.manualInput = true;
                        }

                    })
                    .catch(err => console.log(err));

                console.groupEnd();
            },


            handleSubmit(e) {
                e.preventDefault();
                this.equivalencia.schoolYearValidation();

                //
                UserService.newEquivalence(this.processId, this.equivalencia)
                    .then(response => {

                        const data = response.data;
                        console.log(data);
                        this.$emit("newEquivalence", this.equivalencia);
                        this.createAlert("Equivalência Atribuída",'A equivalência foi atribuída ao aluno com sucesso');

                        this.equivalencia = new Equivalencia();

                    }).catch(err => {
                        console.log(err);
                        this.createAlert("Oops!...", "Houve um erro a atribuir a equivalência ao aluno. Tente novamente mais tarde ou verifique se todo os dados estão preenchidos.");
                })
            },

            fetchSubjects(university, course) {
                UserService.getCourseSubjects(university, course)
                    .then(response => {
                        this.ucOrigem = response.data;
                        console.log(response.data)
                    })
                    .catch(err => console.log(err));
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

</style>
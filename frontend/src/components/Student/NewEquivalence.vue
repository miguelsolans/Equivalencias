<template>
    <v-container>
        <v-form class="my-5">
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
                            filled 
                            rounded 
                            :rules="[v => !!v || 'Especifique o nome da UC realizada']" 
                            required
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
                            required
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
                            :rules="[v => !!v || 'Especifique o ano de conclusão da UC realizada']" 
                            dense
                            filled
                            rounded
                            required
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
                            required
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" sm="4">
                        <v-text-field
                            color="#187653" 
                            label="Nota Obtida" 
                            v-model="equivalencia.nota" 
                            rules="gradeRules" 
                            dense
                            filled
                            rounded
                            required
                        />
                    </v-col>
                    <v-col cols="4" sm="4">
                        <v-text-field
                            color="#187653"
                            label="ECTS" 
                            v-model="equivalencia.ects" 
                            :disabled="disabledInput" 
                            :rules="[v => !!v || 'Deve especificar os créditos da UC realizada']" 
                            dense
                            filled
                            rounded
                            required
                        />
                    </v-col>
                    <v-col cols="4" sm="4">
                        <v-text-field 
                            label="Percentagem da Equivalência" 
                            v-model="equivalencia.percent" 
                            :disabled="disabledInput" 
                            :rules="[v => !!v || 'Especifique a percentagem']" 
                            dense
                            filled
                            rounded
                            required
                        />
                    </v-col>
                </v-row>
            </v-container>
            <!-- Without Autocomplete -->
            <v-container v-else>
                <v-text-field label="UC Realizada" v-model="equivalencia.ucRealizada"></v-text-field>
                <v-text-field label="UC Equivalente" v-model="equivalencia.ucEquiv" :rules="[v => !!v || 'Especifique a que UC que será equivalente']" required></v-text-field>
                <v-text-field label="ECTS" v-model="equivalencia.ects" :disabled="disabledInput" :rules="[v => !!v || 'Deve especificar os créditos da UC realizada']" required></v-text-field>
            </v-container>

            <v-switch v-model="manualInput" class="mx-2" label="Inserção Manual"></v-switch>

            <v-btn color="teal" dark @click="handleSubmit">Criar</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import Equivalencia from '../../models/equivalencia';
    import UserService from '../../services/user.service';
    export default {
        name: "NewEquivalence",
        props: ["process"],
        data() {
            return {
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
                    v => v <= 20 || "Nota não deve ser acima de 20 valores",
                    v => v >= 0 || "Nota não deve ser abaixo de 20 valores"
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
                // TODO: Perform validation?
                this.equivalencia.schoolYearValidation();

                //
                UserService.newEquivalence(this.processId, this.equivalencia)
                    .then(response => {

                        const data = response.data;

                        if(!data.errors) {
                            console.log(data);
                            this.$emit("newEquivalence", this.equivalencia);

                            this.equivalencia = new Equivalencia();
                        } else {
                            console.log(data.errors)
                        }
                    }).catch(err => {
                        console.log(err);
                })
            },

            fetchSubjects(university, course) {
                UserService.getCourseSubjects(university, course)
                    .then(response => {
                        this.ucOrigem = response.data;
                        console.log(response.data)
                    })
                    .catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
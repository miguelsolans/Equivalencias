<template>
    <v-container>
        <v-form>
            <!--<v-text-field label="UC Realizada" v-model="equivalencia.ucRealizada"></v-text-field>-->
            <v-autocomplete v-model="equivalencia.ucRealizada" label="UC Realizada" type="text" :items="ucOrigem" item-text="ucRealizada" @change="subjectChosen" :rules="[v => !!v || 'Especifique o nome da UC realizada']" required></v-autocomplete>

            <v-text-field label="ECTS" v-model="equivalencia.ects" :disabled="disabledInput" :rules="[v => !!v || 'Deve especificar os créditos da UC realizada']" required></v-text-field>

            <v-select label="Semestre da UC Equivalente" v-model="equivalencia.semUcEquiv" :items="['1º Semestre', '2º Semestre']" :rules="[v => !!v || 'Escolha o semestre da UC equivalente']" required></v-select>

            <v-text-field label="Ano letivo de conclusão" v-model="equivalencia.anoLetivo" :rules="[v => !!v || 'Especifique o ano de conclusão da UC realizada']" required></v-text-field>

            <v-text-field label="Nota Obtida" v-model="equivalencia.nota" :rules="gradeRules" required></v-text-field>

            <v-text-field label="Percentagem da Equivalência" v-model="equivalencia.percent" :disabled="disabledInput" :rules="[v => !!v || 'Especifique a percentagem']" required></v-text-field>

            <v-text-field label="UC Equivalente" v-model="equivalencia.ucEquiv" :rules="[v => !!v || 'Especifique a que UC que será equivalente']" required></v-text-field>
            <v-btn color="teal" dark @click="handleSubmit" :disabled="!valid">Criar</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import Equivalencia from '../models/equivalencia';
    import UserService from '../services/user.service';
    export default {
        name: "NewEquivalence",
        props: ["process"],
        data() {
            return {
                processId: this.$route.params.id,
                equivalencia: new Equivalencia(),
                ucOrigem: null,
                ucDestino: null,
                disabledInput: true,

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
                UserService.getSubject(this.process.instProv, this.process.cursoProv, this.equivalencia.ucRealizada)
                    .then(response => {
                        this.ucDestino = response.data;
                        this.disabledInput = false;
                        console.log(response.data);
                    })
                    .catch(err => console.log(err));
            },


            handleSubmit(e) {
                e.preventDefault();

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
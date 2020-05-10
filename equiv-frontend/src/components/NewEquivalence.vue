<template>
    <v-container>
        <p>PROCESS ID: {{ processId }}</p>
        <v-form>
            <v-text-field label="UC Realizada" v-model="equivalencia.ucRealizada"></v-text-field>

            <v-text-field label="ECTS" v-model="equivalencia.ects"></v-text-field>

            <v-select label="Semestre da UC Completada" v-model="equivalencia.semUcEquiv" :items="['1º Semestre', '2º Semestre']"></v-select>

            <v-text-field label="Ano letivo de conclusão" v-model="equivalencia.anoLetivo"></v-text-field>

            <v-text-field label="Nota Obtida" v-model="equivalencia.nota"></v-text-field>

            <v-text-field label="Percentagem da Equivalência" v-model="equivalencia.percent"></v-text-field>

            <v-text-field label="UC Equivalente" v-model="equivalencia.ucEquiv"></v-text-field>
            <v-btn color="teal" dark @click="handleSubmit">Criar</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import Equivalencia from '../models/equivalencia';
    import UserService from '../services/user.service';
    export default {
        name: "NewEquivalence",
        data() {
            return {
                processId: this.$route.params.id,
                equivalencia: new Equivalencia()
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                UserService.newEquivalence(this.processId, this.equivalencia)
                    .then(response => {
                        const data = response.data;

                        if(!data.errors) {
                            console.log(data);
                            this.equivalencia = new Equivalencia();
                        } else {
                            console.log(data.errors)
                        }
                    }).catch(err => {
                        console.log(err);
                })
                // UserService.newEquivalence(this.processId, this.equivalencia)
                //     .then(result => console.log(result.data))
                //     .catch(err => console.log(err));

            }
        }
    }
</script>

<style scoped>

</style>
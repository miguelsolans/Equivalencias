<template>
    <v-container>
        <v-form>
            <v-text-field label="UC Realizada" v-model="equivalencia.id"></v-text-field>

            <v-text-field label="ECTS" v-model="equivalencia.semUcEquiv"></v-text-field>

            <v-text-field label="Nota Obtida" v-model="equivalencia.nota"></v-text-field>

            <v-text-field label="Percentagem da Equivalência" v-model="equivalencia.percent"></v-text-field>

            <v-btn @click="handleSubmit">Criar</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import Equivalencia from '../models/equivalencia'
    export default {
        name: "NewEquivalence",
        data() {
            return {
                equivalencia: new Equivalencia('','','','','','','', '')
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();



            }
        }
    }
</script>

<style scoped>

</style>
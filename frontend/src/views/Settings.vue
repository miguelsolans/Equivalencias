<template>
    <v-container>
        <h2>Definições</h2>

        <v-tabs>
            <v-tab>Conta</v-tab>
            <v-tab>Plataforma</v-tab> <!-- Só se For Administrador -->


            <v-tab-item>
                <h2>Definições da Conta</h2>
                <Account/>
            </v-tab-item>
            <v-tab-item>
                <h2>Definições de Administração da Plataforma</h2>
            </v-tab-item>

        </v-tabs>
    </v-container>
</template>

<script>
    import Account from '../components/Settings/Acount';
    export default {
        name: "Settings",
        data() {

        },
        components: { Account },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
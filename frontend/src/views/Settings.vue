<template>
    <v-container>
        <h2>Definições</h2>
        <p>{{ user.fullName }}</p>
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
    import UserService from '../services/user.service';
    export default {
        name: "Settings",
        data() {
            return {
                user: null
            }
        },
        components: { Account },
        mounted() {
            this.fetchUserInfo();
        },
        methods: {
            fetchUserInfo() {
                UserService.getLoggedUser()
                    .then(response => {
                        let data = response.data;


                        console.table(data);
                    }).catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
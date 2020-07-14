<template>
    <v-container>
        <h2>Definições</h2>
        <v-expansion-panels focusable>
            <v-expansion-panel>
                <v-expansion-panel-header>Conta</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <p>Definições da Plataforma</p>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>Plataforma</v-expansion-panel-header>

                <v-expansion-panel-content>
                    <p>Definições da Plataforma</p>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
<!--        <v-tabs vertical>-->
<!--            <v-tab>Conta</v-tab>-->
<!--            <v-tab :disabled="!user.admin">Plataforma</v-tab> &lt;!&ndash; Só se For Administrador &ndash;&gt;-->
<!--            <v-tab-item>-->
<!--                <h2>Definições da Conta</h2>-->
<!--                <Account/>-->
<!--            </v-tab-item>-->
<!--            <v-tab-item >-->
<!--                <h2>Definições de Administração da Plataforma</h2>-->

<!--                <v-tabs>-->
<!--                    <v-tab>Gerir Utilizadores</v-tab>-->
<!--                    <v-tab>Gerir Faculdades</v-tab>-->

<!--                    <v-tab-item>-->
<!--                        <h3>Gerir Utilizadores do Sistema</h3>-->
<!--                        <ManageUsers/>-->
<!--                    </v-tab-item>-->

<!--                    <v-tab-item>-->
<!--                        <h3>Gerir Faculdades do Sistema</h3>-->
<!--                    </v-tab-item>-->
<!--                </v-tabs>-->
<!--            </v-tab-item>-->

<!--        </v-tabs>-->
    </v-container>
</template>

<script>
    //import Account from '../components/Settings/Acount';
    //import ManageUsers from '../components/Settings/ManageUsers';
    import UserService from '../services/user.service';
    export default {
        name: "Settings",
        data() {
            return {
                user: {}
            }
        },
        //components: { Account, ManageUsers },
        mounted() {
            UserService.getLoggedUser()
                .then(response => {
                    let data = response.data;

                    this.user = { ...data }
                    console.table(data);
                }).catch(err => console.log(err));
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
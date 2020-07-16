<template>
    <v-container>
        <h2>Definições</h2>

        <v-tabs>
            <v-tab>Conta</v-tab>
            <v-tab>Plataforma</v-tab>

            <v-tab-item>
                <v-expansion-panels focusable>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Informações</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <Account/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>Segurança</v-expansion-panel-header>

                        <v-expansion-panel-content>
                            <Password/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tab-item>

            <v-tab-item>
                <v-expansion-panels focusable>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Utilizadores Registados</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <ManageUsers/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Registar Novo Utilizador</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <ManageUsers/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Faculdades Registadas</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <Password/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Registar Faculdade</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <ManageUsers/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    import Account from '../components/Settings/Acount';
    import ManageUsers from '../components/Settings/ManageUsers';
    import UserService from '../services/user.service';
    import Password from '../components/Settings/Password';
    export default {
        name: "Settings",
        data() {
            return {
                user: {}
            }
        },
        components: { Account, ManageUsers, Password },
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
<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="8">
                <h1>Definições</h1>
                <p style="color: #187653"> {{ user.username }}</p>
            </v-col>
            <v-col cols="6" sm="6" md="4" align="right">
                <v-row align="center" no-gutters>
                    <v-col class="mx-5">
                        <h4 style="color: #187653">Utilizador(a) {{ user.fullName }} </h4>
                        <p> </p>
                    </v-col>
                    <v-col class="mb-5" cols="2">
                        <v-avatar size="65px">
                            <img src="../assets/images/EditProcess.png" alt="Avatar para o processo"/>
                        </v-avatar>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <h2>Definições</h2>

        <v-tabs>
            <v-tab>Conta</v-tab>
            <v-tab :disabled="!user.admin">Plataforma</v-tab>

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

            <v-tab-item v-if="user.admin">
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
                            <NewUser/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Faculdades Registadas</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <ManageUniversities/>
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
    // TODO: Use props instead of fetching for data in components
    import Account from '../components/Settings/Acount';
    import Password from '../components/Settings/Password';

    import ManageUsers from '../components/Settings/ManageUsers';
    import NewUser from '../components/Settings/NewUser';
    import ManageUniversities from '../components/Settings/ManageFaculty'

    import UserService from '../services/user.service';
    export default {
        name: "Settings",
        data() {
            return {
                user: {},
                universities: [],
                users: []
            }
        },
        components: { Account, ManageUsers, Password, NewUser, ManageUniversities },
        mounted() {
            this.getLoggedUser();

            if(this.user.admin) {
                this.getUniversities();
                this.getUsers();
            }
        },
        methods: {
            getLoggedUser() {
                UserService.getLoggedUser()
                    .then(response => {
                        let data = response.data;

                        this.user = { ...data }
                        console.table(data);
                    }).catch(err => console.log(err));
            },

            getUniversities() {
                UserService.listUniversities()
                    .then(response => {
                        this.universities.push(...response.data)
                    }).catch(err => console.log(err));
            },

            getUsers() {
                UserService.getSystemUsers()
                    .then(response => {
                        this.users.push(...response.data);
                    }).catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
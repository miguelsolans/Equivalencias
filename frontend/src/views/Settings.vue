<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="8">
                <h1>Definições</h1>
            </v-col>
            <v-col cols="6" sm="6" md="4" align="right">
                <v-row align="center" no-gutters>
                    <v-col class="mx-5">
                        <h4 style="color: #187653">Utilizador(a) {{ user.fullName }} </h4>
                        <p v-if="user.admin">@{{ user.username }} <b>Administrador</b></p>
                        <p v-if="!user.admin">@{{ user.username }} <b>Utilizador Standard</b></p>
                    </v-col>
                    <v-col class="mb-5" cols="2">
                        <v-avatar size="65px">
                            <img src="../assets/images/Settings.png" alt="Avatar para o processo"/>
                        </v-avatar>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-tabs centered show-arrows class="my-5" color="#187653">
            <v-tab>Gestão Conta e Segurança</v-tab>
            <v-tab :disabled="!user.admin">Gestão Utilizadores</v-tab>
            <v-tab :disabled="!user.admin">Gestão Faculdades</v-tab>
            <v-tab-item class="my-10">
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header class="d-none d-sm-flex">
                            <b style="color: #187653">
                                <v-icon color="#187653">mdi-account</v-icon> 
                                Informações Gerais
                            </b>
                            Gestão do Nome, Username, Email e Tipo de Utilizador
                        </v-expansion-panel-header>
                        <v-expansion-panel-header class="d-flex d-sm-none">
                            <b style="color: #187653">
                                <v-icon color="#187653">mdi-account</v-icon> 
                                Informações Gerais
                            </b>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <Account/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header class="d-none d-sm-flex">
                            <b style="color: #187653">
                                <v-icon color="#187653">mdi-lock-question</v-icon> 
                                Segurança
                            </b>
                            Alteração da Password
                        </v-expansion-panel-header>
                        <v-expansion-panel-header class="d-flex d-sm-none">
                            <b style="color: #187653">
                                <v-icon color="#187653">mdi-lock-question</v-icon> 
                                Segurança
                            </b>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <Password/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tab-item>
            <v-tab-item v-if="user.admin" class="my-10">
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Utilizadores Registados</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <ManageUsers :users="users" @removeUser="removeUser"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Registar Novo Utilizador</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <NewUser :users="users" @newUser="newUser"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tab-item>
            <v-tab-item v-if="user.admin" class="my-10">
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Faculdades Registadas</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <ManageUniversities :universities="universities"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Registar Faculdade</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <NewFaculty :universities="universities" @newUniversity="newUniversity"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    import Account from '../components/Settings/Acount';
    import Password from '../components/Settings/Password';

    import ManageUsers from '../components/Settings/ManageUsers';
    import NewUser from '../components/Settings/NewUser';
    import ManageUniversities from '../components/Settings/ManageFaculty'

    import UserService from '../services/user.service';
    import NewFaculty from "../components/Settings/NewFaculty";
    export default {
        name: "Settings",
        data() {
            return {
                user: {},
                universities: [],
                users: []
            }
        },
        components: {NewFaculty, Account, ManageUsers, Password, NewUser, ManageUniversities },
        mounted() {
            this.getLoggedUser();

            if(this.isAdmin) {
                console.log("Admin Logged on");
                this.getUniversities();
                this.getUsers();
            }
        },
        computed: {
            isAdmin() {
                return this.$store.state.auth.user.admin;
            }
        },
        methods: {
            getLoggedUser() {
                UserService.getLoggedUser()
                    .then(response => {
                        let data = response.data;
                        this.user = { ...data }

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
                        console.log(response.data);
                        this.users.push(...response.data);
                    }).catch(err => console.log(err));
            },
            newUser(user) {
                console.log("Updating Users...");
                this.users.push(user);
            },
            newUniversity(university) {
                console.log("Updating universities...");
                this.universities.push(university);
            },
            removeUser(user) {
                this.users = this.users.filter( u => {
                    return u.username !== user.username
                });
            }
        }
    }
</script>

<style scoped>

</style>
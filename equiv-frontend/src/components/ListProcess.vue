<template>
    <v-container>
        <h2>Lista de Processos</h2>
        <v-container>
            <v-card>
                <v-list two-line>
                    <template v-for="process in processes">
                        <v-list-item :key="process.processo">
                            <v-list-item-avatar v-if="process.avatar">
                                <img :src="process.avatar">
                            </v-list-item-avatar>
                            <v-list-item-avatar v-else-if="!process.avatar">
                                <img src="../assets/User.png">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-html="process.nomeAluno"></v-list-item-title>
                                <v-list-item-subtitle>
                                    <span>Número de Processo: </span> {{process.processo}}
                                </v-list-item-subtitle>

                                <v-list-item-subtitle>
                                    <span>Número de Aluno: </span> {{process.idAluno}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider :key="process.processo"></v-divider>
                    </template>
                </v-list>
            </v-card>
<!--            <v-layout v-for="process in processes" row :key="process.processo">-->
<!--                <v-flex md6>-->
<!--                    <p>{{process.nomeAluno}}</p>-->
<!--                    <v-img src="../assets/User.png"></v-img>-->
<!--                </v-flex>-->
<!--                <v-flex md6>-->
<!--                    <p><b>Número de Processo</b></p>-->
<!--                    <router-link :to="{ name: 'process', params: { id: process.processo }}">-->
<!--                        <p>{{process.processo}}</p>-->
<!--                    </router-link>-->


<!--                    <p><b>Número de Aluno</b></p>-->
<!--                    <p>{{ process.idAluno }}</p>-->
<!--                </v-flex>-->
<!--            </v-layout>-->
        </v-container>
    </v-container>
</template>

<script>
    import UserService from '../services/user.service'
    export default {
        name: "ListProcess",
        data() {
            return {
                processes: null,
                message: ''
            }
        },
        mounted() {
            UserService.listProcesses()
                .then(response => this.processes = response.data)
                .catch(err => {
                    this.message = err;
                });
        }
    }
</script>

<style scoped>
    .v-image {
        max-width: 150px;
    }
</style>
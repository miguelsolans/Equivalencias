<template>
    <v-container>
        <v-container>
            <v-card>
                <v-text-field outlined clearable color="success" label="Procurar..."></v-text-field>
<!--                <v-text-field class="mx-3" flat label="Procurar..." solo-inverted v-model="search" clearable @click:clear="clearSearch"></v-text-field>-->
                <v-list two-line>
                    <h2>Lista de Processos</h2>

                    <template v-for="(process, index) in processes">
                        <v-list-item :key="process.processo" :to="{ name: 'process', params: { id: process._id }}">
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
                        <v-divider :key="index"></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
    import UserService from '../services/user.service'
    export default {
        name: "ListProcess",
        data() {
            return {
                search: '',
                processes: null,
                message: ''
            }
        },
        created() {
            this.$on('newProcess', data => this.processes.push(data) );
        },
        mounted() {
            UserService.listProcesses()
                .then(response => this.processes = response.data)
                .catch(err => {
                    this.message = err;
                });
        },
        methods: {
            clearSearch () {
                this.search="";
            }
        }
    }
</script>

<style scoped>
    .v-image {
        max-width: 150px;
    }
    /*
     * I'm just trying something here, don't get rid of that yet
     */
    .v-list.v-sheet.v-sheet--tile.theme--light.v-list--two-line {
        height: 550px;
        overflow-y: auto;
    }
</style>
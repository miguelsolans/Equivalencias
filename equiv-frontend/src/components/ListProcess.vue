<template>
    <v-container>
        <h2>Lista de Processos</h2>
        <v-container>
            <v-card>
                <v-list two-line>
                    <template v-for="(process, index) in processes">
                        <v-list-item :key="process.processo" :to="{ name: 'process', params: { id: process.processo }}">
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
                processes: null,
                message: ''
            }
        },
        created() {
            this.$root.$on('newProcess', data => this.processes.push(data) );
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
    /*
     * I'm just trying something here, don't get rid of that yet
     */
    .v-list.v-sheet.v-sheet--tile.theme--light.v-list--two-line {
        height: 550px;
        overflow-y: auto;
    }
</style>
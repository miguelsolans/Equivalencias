<template>
    <v-container>
        <v-text-field
            outlined
            rounded
            dense
            clearable
            color="#32b37d"
            append-icon="mdi-magnify"
            placeholder="Procurar Processo Equivalência..."
            @click:clear="clearSearch"
        ></v-text-field>
        <v-card rounded>
            <v-list rounded two-line>
                <template v-for="(process, index) in processes">
                    <v-list-item
                        :key="process.processo"
                        :to="{ name: 'process', params: { id: process._id } }"
                    >
                        <v-list-item-avatar v-if="process.avatar">
                            <img :src="process.avatar" />
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else-if="!process.avatar">
                            <img src="../../assets/images/User.png" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                class="font-weight-bold" 
                                v-html="process.nomeAluno"
                            ></v-list-item-title>
                            <v-list-item-subtitle>
                                <span>Número de Processo: </span> {{ process.processo }}
                            </v-list-item-subtitle>

                            <v-list-item-subtitle>
                                <span>Número de Aluno: </span> {{ process.idAluno }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="index"></v-divider>
                </template>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
    import UserService from "../../services/user.service";
    export default {
        name: "ListProcess",
        data() {
            return {
                search: "",
                processes: null,
                message: "",
            };
        },
        created() {
            this.$on("newProcess", (data) => this.processes.push(data));
        },
        mounted() {
            UserService.listProcesses()
                .then((response) => (this.processes = response.data))
                .catch((err) => {
                    this.message = err;
                });
        },
        methods: {
            clearSearch() {
                this.search = "";
            },
        },
    };
</script>

<style scoped>

    /* Mudar o tamanho do Avatar de cada processo */
    .v-image {
        max-width: 150px;
    }

    /* Alterar o border-radius do card da Lista de Processos */
    .v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: 10px;
    }

    /* Alterar altura do card da Lista de Processos */
    /* Feito para caber apenas 4 processos visíveis */
    .v-list.v-sheet.v-sheet--tile.theme--light.v-list--two-line {
        height: 350px;
        overflow-y: auto;
    }
</style>

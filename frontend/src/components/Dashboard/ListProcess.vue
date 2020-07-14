<template>
    <v-container>
        <v-text-field
            class="textSearch"
            filled
            rounded
            dense
            clearable
            color="#187653"
            prepend-inner-icon="mdi-magnify"
            placeholder="Procurar Processo Equivalência"
            v-model="search"
            @click:clear="clearSearch"
        ></v-text-field>
        <v-card rounded>
            <v-list 
                two-line
                rounded 
            >
                <template v-for="(process, index) in filterStudents">
                    <v-list-item
                        :key="process.processo"
                        :to="{ name: 'process', params: { id: process._id } }"
                    >
                        <v-list-item-avatar v-if="process.avatar">
                            <img :src="process.avatar"/>
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else-if="!process.avatar" style="backgroundImage: linear-gradient(#3bb98a, #187653)" class="imgAvatar">
                            <span class="white--text">{{ firstUppercaseLetter(process.nomeAluno) }}{{ lastUppercaseLetter(process.nomeAluno) }}</span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                class="font-weight-bold" 
                                v-html="process.nomeAluno"
                            ></v-list-item-title>
                            <v-list-item-subtitle>
                                <span>Processo </span> {{ process.processo }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                <span>Aluno Número </span> {{ process.idAluno }}
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
                processes: [],
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
        computed: {
            filterStudents: function() {
                let self = this;
                return this.processes.filter(el => el.nomeAluno.toLowerCase().includes(self.search.toLowerCase()) || el.idAluno.toLowerCase().includes(self.search.toLowerCase()) || el.processo.toLowerCase().includes(self.search.toLowerCase()))
            }
        },
        methods: {
            clearSearch() {
                this.search = "";
            },
            // Função que obtém a primeira letra maiúscula do nome do Aluno
            firstUppercaseLetter: function(string) {
                const regex = /\b[A-Z]/g;
                const stringSplit = string.split(' ');
                return regex.exec(stringSplit[0])[0];
            },
            // Função que obtém a última letra maiúscula do nome do Aluno
            lastUppercaseLetter: function(string) {
                const regex = /\b[A-Z]/g;
                const stringSplit = string.split(' ');
                return regex.exec(stringSplit[stringSplit.length-1])[0];
            }      
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
        border-radius: 20px;
    }
    /* Alterar altura do card da Lista de Processos */
    /* Feito para caber apenas 4 processos visíveis */
    .v-list.v-sheet.v-sheet--tile.theme--light.v-list--two-line {
        height: 355px;
        overflow-y: auto;
    }
    /* Alterar a cor do ícone e do texto da Caixa de Pesquisa */
    .textSearch >>> input {
        caret-color: #187653 !important;
        color: #187653;
        font-size: 0.9em;
    }
    .textSearch >>> .v-icon {
        color: #187653;
    }
    
    .imgAvatar {
        -webkit-box-shadow:0 1px 4px #959595; 
        box-shadow:0 1px 4px #959595;
    }
</style>
<template>
    <v-container>
        <v-app-bar
            app
            color="#313131"
            dark
            dense
            short
        >
            <v-spacer></v-spacer>
            <v-toolbar-title style="width: 160px">
                <a href="/"><img class="imgLogo pt-1" src="../assets/images/Logo Branco.png"/></a>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <div class="text-center mx-1">
                <v-btn
                    href="/"
                    rounded
                    elevation="0"
                    text color="#fff"
                    dark
                >
                    <div
                        class="text-capitalize
                        mx-1 
                        d-none 
                        d-sm-flex"
                    >
                        <strong>Página Inicial</strong>
                        <v-icon>mdi-home-variant</v-icon>
                    </div>
                </v-btn>
            </div>

            <v-divider inset vertical></v-divider>

            <div class="text-center mx-1">
                <v-btn
                    rounded
                    elevation="0"
                    text
                    color="#fff"
                    dark
                    href="/settings"
                >
                    <div
                        class="text-capitalize
                        mx-1 
                        d-none 
                        d-sm-flex"
                    >
                        <strong>Definições</strong>
                    <v-icon>mdi-cog</v-icon>
                    </div>
                </v-btn>
            </div>

            <v-divider inset vertical></v-divider>

            <div class="text-center mx-1" @click="logoutAlert = true">
                <v-btn
                    rounded
                    elevation="0"
                    text 
                    color="#32b37d"
                    dark
                >
                    <div
                        class="text-capitalize
                        mx-1 
                        d-none 
                        d-sm-flex"
                    >
                        <strong>Sair</strong>
                    <v-icon>mdi-logout-variant</v-icon>
                    </div>
                </v-btn>
            </div>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-dialog v-model="logoutAlert" persistent max-width="350">
            <v-card>
                <v-card-title class="headline">Terminar Sessão?</v-card-title>
                <v-card-text>Todos as suas alterações não guardadas serão perdidas.</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="green darken-1" text @click="logoutAlert = false">Voltar Atrás</v-btn>
                    <v-btn color="red darken-1" text @click="handleLogout">Terminar Sessão</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

    export default {

        props: {
            source: String
        },
        computed: {
            dashboardPage() {
                return this.$route.name == "dashboard";
            }
        },
        data: () => ({
            logoutAlert: false
        }),
        methods: {
            handleLogout() {
                this.$store
                    .dispatch("auth/logout")
                    .then(() => this.$router.push("/login"))
                    .catch(err => console.log(err));
            }
        }
    };

</script>

<style scoped>

    /* CSS a ser aplicado a toda a Navbar */
    * {
        font-size: 13px;
    }

    /* Mudar o tamanho dos ícones */
    .v-btn > .v-btn__content .v-icon {
        font-size: 20px;
    }

    /* Efeito hover do Logo aplicado */
    .imgLogo {
        width: 100%;
        -webkit-filter: drop-shadow(1px 1px 1px #222);
        filter: drop-shadow(1px 1px 1px #222);
    }

    .imgLogo:hover {
        -webkit-filter: drop-shadow(0px 2px 3px #187754);
        filter: drop-shadow(0px 2px 3px #187754);
    }

</style>
<template>
    <v-container class="mb-7">
        <v-app-bar
                app
                color="teal"
                dark
        >
            <v-btn icon large :to="{ name: 'dashboard' }">
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <span>MANTIS</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon large @click.stop="drawer = !drawer">
                <v-avatar size="32px" icon>
                    <v-icon>mdi-account-cog</v-icon>
                </v-avatar>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                right
                app
                false
        >
            <v-list-item-group>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-account-cog</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Definições</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="logoutAlert = true">
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Terminar Sessão</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list-item-group>
        </v-navigation-drawer>

        <v-dialog v-model="logoutAlert" persistent max-width="350">
            <v-card>
                <v-card-title class="headline">Deseja terminar sessão?</v-card-title>
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
            source: String,
        },
        data: () => ({
            drawer: false,
            logoutAlert: false
        }),
        methods: {
            handleLogout() {
                this.$store.dispatch('auth/logout')
                    .then(() => this.$router.push('/login'))
                    .catch(err => console.log(err));
            }
        }
    }
</script>
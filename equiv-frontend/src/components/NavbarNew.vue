<template>
    <v-container>
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

                <v-list-item @click="handleLogout">
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Terminar Sessão</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list-item-group>
        </v-navigation-drawer>
    </v-container>

</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            dialog: false,
            drawer: false,
            avisoLogout: false
        }),
        methods: {
            handleLogout() {

                this.$swal.fire({
                    title: 'Deseja terminar sessão?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4ed68f',
                    cancelButtonColor: '#dd6055',
                    confirmButtonText: 'Logout'
                }).then((result) => {
                    if (result.value) {
                        this.$swal.fire(
                            'Sessão terminada com sucesso.',
                            '',
                            'success'
                        );
                        this.$store.dispatch('auth/logout')
                            .then(() => this.$router.push('/login'))
                            .catch(err => console.log(err));
                    }
                });
            }
        }
    }
</script>
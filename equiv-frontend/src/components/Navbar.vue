<template>
    <v-toolbar
            color="teal"
            dark
    >
        <v-toolbar-title>Mantis</v-toolbar-title>

        <v-divider
                class="mx-4"
                inset
                vertical
        ></v-divider>

        <v-toolbar-items>
            <v-btn text :to="{ name: 'dashboard' }">
                Dashboard
            </v-btn>
        </v-toolbar-items>


        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn text @click="handleLogout">
                Logout
            </v-btn>

            <v-divider
                    inset
                    vertical
            ></v-divider>

            <v-btn text>
                Settings
            </v-btn>

            <v-divider
                    inset
                    vertical
            ></v-divider>
        </v-toolbar-items>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-toolbar>
</template>

<script>
    export default {
        name: "Navbar",
        methods: {
            handleLogout() {

                this.$swal.fire({
                    title: 'Deseja fazer logout?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4ed68f',
                    cancelButtonColor: '#dd6055',
                    confirmButtonText: 'Logout'
                }).then((result) => {
                    if (result.value) {
                        this.$swal.fire(
                            'Logout efetuado com sucesso.',
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

<style scoped>

</style>
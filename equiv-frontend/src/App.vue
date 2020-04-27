<template>
    <v-app>
        <div v-if="loggedOn">
            <Navbar></Navbar>
        </div>
        <main>
            <v-container fluid>
                <router-view/>
            </v-container>
        </main>
    </v-app>
</template>

<script>
    import Navbar from './components/Navbar'
    export default {
        components: {
            Navbar
        },
        computed: {
            loggedOn() {
                return this.$store.state.auth.status.loggedIn;
            }
        }
    }
</script>
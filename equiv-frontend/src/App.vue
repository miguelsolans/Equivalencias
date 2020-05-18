<template>
    <v-app>
        <v-container>
            <div v-if="loggedOn">
                <Navbar></Navbar>
            </div>
            <router-view/>
        </v-container>
    </v-app>
</template>

<script>
    import Navbar from "./components/Navbar";
    export default {
        components: {
            Navbar
        },
        computed: {
            loggedOn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            console.log("MOUNTED " + process.env.VUE_APP_API_SERVER)
        }
    }
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Rubik&family=Secular+One&display=swap%27');

</style>
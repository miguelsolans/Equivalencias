<template>
    <v-app>
        <v-content>
            <div v-if="loggedOn">
                <Navbar></Navbar>
            </div>
            <router-view />
        </v-content>
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
            console.log("MOUNTED " + process.env.VUE_APP_API_SERVER);
        },
        watch: {
            $route(to) {
                document.title = `${to.meta.title}`;
                const link = document.querySelector("[rel='icon']");
                link.setAttribute("href", to.meta.icon);
            }
        }
    };
</script>

<style scoped>

    @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&family=Secular+One&display=swap");

    * {
        font-family: "Rubik", sans-serif;
    }

</style>
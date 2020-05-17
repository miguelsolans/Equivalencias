<template>
    <v-app>
        <div v-if="loggedOn">
            <NavbarNew></NavbarNew>
        </div>
        <main>
            <v-container class="fill-height" fluid>
                <router-view/>
            </v-container>
        </main>
    </v-app>
</template>

<script>
    import NavbarNew from "./components/NavbarNew";
    export default {
        components: {
            NavbarNew
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
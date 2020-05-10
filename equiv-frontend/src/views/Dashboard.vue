<template>
    <v-container>
            <v-layout row>
                <v-flex md4>
                    <ListProcess/>
                </v-flex>
                <v-flex md8>
                    <v-divider inset vertical></v-divider>
                    <v-row>
                        <v-row align="center" justify="center">
                            <v-img position="center center" class="logo-img" src="../assets/Logo.png"></v-img>
                        </v-row>
                        <NewProcess/>
                    </v-row>
                </v-flex>
            </v-layout>
    </v-container>
</template>

<script>
    import NewProcess from '../components/NewProcess';
    import ListProcess from '../components/ListProcess';
    export default {
        name: "Dashboard",
        components: {
            NewProcess,
            ListProcess
        }
    }
</script>

<style scoped>
    .logo-img {
        max-width: 500px;
    }
</style>
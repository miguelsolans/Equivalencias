<template>
    <v-container>
        <v-card>
            <v-layout row>
                <v-flex md4>
                    <ListProcess/>
                </v-flex>
                <v-flex md8>
                    <v-divider inset vertical></v-divider>
                    <v-row>
                        <v-img class="logo-img" src="../assets/Logo.png"></v-img>
                        <NewProcess/>
                    </v-row>
                </v-flex>

            </v-layout>
        </v-card>
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
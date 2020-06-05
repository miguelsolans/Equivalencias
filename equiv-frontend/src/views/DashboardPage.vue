<template>
    <v-container>
            <v-layout row>
                <v-flex md4>
                    <ListProcess/>
                </v-flex>
                <v-flex md8>
                    <NewProcess/>
                </v-flex>
            </v-layout>
    </v-container>
</template>

<script>
    import NewProcess from '../components/DashboardPage/NewProcess';
    import ListProcess from '../components/DashboardPage/ListProcess';
    export default {
        name: "Dashboard",
        components: {
            NewProcess,
            ListProcess
        }
    }
</script>

<style scoped>

    /* CSS a ser aplicado a toda a Dashboard */
    * {
    font-family: 'Rubik', sans-serif;
    }
    
</style>
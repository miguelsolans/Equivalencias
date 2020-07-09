<template>
    <v-container>
            <v-layout row>
                <v-flex md4>
                    <v-divider inset vertical></v-divider>
                    <ListProcess/>
                </v-flex>
                <v-flex md8>
                    <v-divider inset vertical></v-divider>
                    <NewProcess/>
                </v-flex>
            </v-layout>
    </v-container>
</template>

<script>
    import NewProcess from '../components/Dashboard/NewProcess';
    import ListProcess from '../components/Dashboard/ListProcess';
    
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
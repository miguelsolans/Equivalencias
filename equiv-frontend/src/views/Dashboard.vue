<template>
    <v-container>
        <v-card>
            <v-layout row>
                <v-flex md6>
                    <ListProcess/>
                </v-flex>
                <v-flex md6>
                    <NewProcess/>
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

</style>
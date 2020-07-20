<template>
    <v-container>
        <v-data-table class="table-striped" color="#187653" fixed-header :headers="headers" :items="universities" sort-by="codInstit">

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editUniversity(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteUniversity(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    export default {
        name: "ManageFaculty",
        props: ['universities'],
        data() {
            return {
                headers: [
                    { text: "Código", value: "codInstit" },
                    { text: "Nome", value: "nomeInstit" },
                    { text: "Operações", value: "actions", sortable: false}
                ],
            }
        },
        mounted() {
        },
        methods: {
            editUniversity(university) {
                console.log("Edit University");
                console.log(university.nomeInstit);
            },

            deleteUniversity(university) {
                console.log("Delete University");

                UserService.deleteUniversity(university.codInstit)
                    .then(response => {
                        // TODO: Emit change to parent
                        console.log(response);
                    }).catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
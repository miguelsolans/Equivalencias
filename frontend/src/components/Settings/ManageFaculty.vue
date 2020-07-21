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

        <v-dialog v-model="editModal">
            <v-card>
                <v-card-title>Editar Instituição: {{this.university.nomeInstit}}</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form>
                            <v-text-field v-model="university.codInstit" label="Código da Instituição" type="number"/>
                            <v-text-field v-model="university.nomeInstit" label="Nome da Instituição" type="text"/>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="blue darken-1" text @click="editModal = false">Fechar</v-btn>
                    <v-btn color="blue darken-1" text @click="handleSubmit">Atualizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    import University from '../../models/university';
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
                editModal: false,
                university: new University(0, "")
            }
        },
        mounted() {
        },
        methods: {
            editUniversity(university) {
                console.log("Edit University");
                console.log(university.nomeInstit);

                this.university = new University(university.codInstit, university.nomeInstit);

                this.editModal = true;
            },

            deleteUniversity(university) {
                console.log("Delete University");

                UserService.deleteUniversity(university.codInstit)
                    .then(response => {
                        // TODO: Emit change to parent
                        console.log(response);
                    }).catch(err => console.log(err));
            },
            handleSubmit(e) {
                e.preventDefault();

                // TODO: API Request
            }
        }
    }
</script>

<style scoped>

</style>
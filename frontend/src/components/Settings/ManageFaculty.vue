<template>
    <v-container>
        <v-data-table 
            class="table-striped" 
            color="#187653" 
            fixed-header 
            :headers="headers" 
            :items="universities" 
            sort-by="codInstit"
            :page.sync="page"
            :pagination.sync="pagination"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
        >
            <template v-slot:item.actions="{ item }">
                <v-icon color="#187653" small class="mr-2" @click="editUniversity(item)">
                    mdi-pencil
                </v-icon>
                <v-icon color="#187653" small @click="deleteUniversity(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <div class="my-5 text-center pt-2">
            <v-pagination
                color="#187653" 
                v-model="page" 
                :length="pageCount"
                circle
            ></v-pagination>
        </div>
        <v-dialog v-model="editModal" retain-focus persistent max-width="600px">
            <v-card style="font-family: Rubik, sans-serif;">
                <v-card-title class="pt-5 py-4 justify-center">
                    <h3>Editar Instituição</h3>
                </v-card-title>
                <h5 class="mt-5 mx-12">* Campos de preenchimento obrigatório</h5>
                <v-card-text class="my-4">
                    <v-container>
                        <v-form>
                            <v-text-field color="#187653" v-model="university.codInstit" label="Código da Instituição *" type="text" dense filled rounded hide-details clearable/>
                            <v-text-field class="mt-5" color="#187653" v-model="university.nomeInstit" label="Nome da Instituição *" type="text" dense filled rounded hide-details clearable/>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions class="pt-0 justify-center">
                    <v-btn color="#187653" text @click="editModal = false"><b>Fechar</b></v-btn>
                    <v-btn  color="#34ac80" text @click="handleSubmit"><b>Atualizar</b></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="alert.display" retain-focus persistent max-width="350">
            <v-card style="font-family: Rubik, sans-serif;">
                <v-card-title style="font-weight: bold;" class="justify-center">
                    {{alert.title}}
                </v-card-title>
                <v-card-text class="text-justify">{{alert.message}}</v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="#187653" text @click="alert.hideAlert()"><b>Fechar</b></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import UserService from '../../services/user.service';
    import University from '../../models/university';
    import Alert from '../../models/alert';

    export default {
        name: "ManageFaculty",
        props: ['universities'],
        data() {
            return {
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                alert: new Alert(0, "", "", {}, false),
                headers: [
                    { text: "Código", value: "codInstit" },
                    { text: "Nome", value: "nomeInstit" },
                    { text: "Operações", value: "actions", align: "center", sortable: false}
                ],
                editModal: false,
                university: new University(0, ""),
                oldId: 0
            }
        },
        mounted() {
        },
        methods: {
            editUniversity(university) {
                console.log("Edit University");
                console.log(university.nomeInstit);

                this.university = new University(university.codInstit, university.nomeInstit);
                this.oldId = university.codInstit;

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

                UserService.updateUniversity(this.oldId, this.university)
                    .then(() => {
                        console.log("Updated");

                        this.editModal = false;
                        this.createAlert("Informação Atualizada", `A faculdade ${this.university.nomeInstit} foi atualizada com sucesso.`);
                    }).catch(() => {

                        this.editModal = false;
                        this.createAlert("Oops!...", `Não foi possível atualizar as informações da faculdade ${this.university.nomeInstit}. Tente novamente mais tarde!`);
                });
            },
            createAlert(title, message) {
                this.alert.setTitle(title);
                this.alert.setMessage(message);

                this.alert.displayAlert();
            }
        }
    }
</script>

<style scoped>

</style>
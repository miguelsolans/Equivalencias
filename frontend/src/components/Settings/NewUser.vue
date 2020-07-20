<template>
    <v-container>
        <v-form>
            <v-text-field v-model="user.fullName" label="Nome Completo" type="text" required/>
            <v-text-field v-model="user.username" label="Username" type="text" required/>
            <v-text-field v-model="user.email" label="E-mail" type="email" :rules="emailRules"/>
            <v-text-field v-model="user.password" label="Password" type="password" required/>
            <v-checkbox v-model="user.admin" label="Conta de Administração" required/>

            <v-btn color="error" @click="handleSubmit">Criar Utilizador</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import User from '../../models/user';
    import UserService from '../../services/user.service';
    import Alert from '../../models/alert';

    export default {
        name: "NewUser",
        props: ["users"],
        data() {
            return {
                alert: new Alert(0, "", "", {}, false),

                user: new User(),

                emailRules: [
                    v => !!v || 'Introduza o E-mail da Conta',
                    v => /.+@.+\..+/.test(v) || 'Deve introduzir um E-mail válido',
                ],
            }
        },
        mounted() {
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                console.group("Creating User");

                UserService.newUser(this.user)
                    .then(response => {
                        console.group("New User Successfully");
                        this.$emit("newUser", response.data);
                        console.log(response.data)
                        console.groupEnd();
                    })
                    .catch(err => {
                        console.log(err)
                    })
                console.groupEnd();
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
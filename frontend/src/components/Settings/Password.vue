<template>
    <v-container>
        <v-form>
            <v-text-field v-model="oldPassword" label="Password Atual" :rules="oldPasswordRules"></v-text-field>
            <v-text-field v-model="newPassword" label="Nova Password" hint="Pelo menos 8 caracteres" :rules="passwordRules"></v-text-field>
            <v-btn color="error" @click="handleSubmit">Alterar Password</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import UserService from '../../services/user.service.js';
    export default {
        name: "Password",
        data() {
            return {
                oldPassword: '',
                newPassword: '',

                oldPasswordRules: [
                    v => !!v || "Digite a sua password antiga"
                ],
                passwordRules: [
                    v => !!v || "Password não pode estar em branco",
                    v => (v && v.length >= 8) || "A nova password deve ter pelo menos 8 caracteres"
                ]
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();

                UserService.updatePassword(this.oldPassword, this.newPassword)
                    .then(response => {
                        console.log(response.data);
                        // TODO: DO SOMETHING
                    }).catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
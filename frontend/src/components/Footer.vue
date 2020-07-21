<template>
    <v-footer
        padless
        dense
      >
        <v-row
          justify="center"
          no-gutters
        >
          <v-col
            align="center"
            style="background: #187653"
            class="py-4 justify-center text-center white--text"
            cols="12"
          >
            <img style="width: 100px" class="imgLogo mb-2" align="center" src="../assets/images/Logo Branco.png"/>
            <v-divider inset vertical></v-divider>
            {{ new Date().getFullYear() }} — Made with <strong>Vuetify</strong>
          </v-col>

        </v-row>

        <v-dialog v-model="logoutAlert" persistent max-width="350">
          <v-card>
              <v-card-title class="headline">Terminar Sessão?</v-card-title>
              <v-card-text>Todos as suas alterações não guardadas serão perdidas.</v-card-text>
              <v-card-actions class="justify-center">
                  <v-btn color="#187653" text @click="logoutAlert = false">Voltar Atrás</v-btn>
                  <v-btn color="red darken-1" text @click="handleLogout">Terminar Sessão</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-footer>
</template>

<script>

    export default {

        data: () => ({
            logoutAlert: false
        }),
        methods: {
            handleLogout() {
                this.$store
                    .dispatch("auth/logout")
                    .then(() => this.$router.push("/login"))
                    .catch(err => console.log(err));
            }
        }
    };

</script>

<style scoped>

    .imgLogo {
        width: 100%;
    }

</style>
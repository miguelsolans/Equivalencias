<template>
  <v-container class="mb-7">
    <v-app-bar app color="#313131" dark dense short elevate-on-scroll>
      <v-spacer></v-spacer>
      <v-toolbar-title style="width: 160px">
        <img class="imgLogo pt-1" src="../assets/images/Logo Branco.png" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center mx-2">
        <v-btn rounded color="primary" dark>
          <text-area class="text-capitalize mx-1 .d-sm-none .d-md-flex">
            <strong>Página Inicial</strong>
          </text-area>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </div>
      <div class="text-center mx-2">
        <v-btn rounded color="primary" dark>
          <text-area class="text-capitalize mx-1 .d-sm-none .d-md-flex">
            <strong>Definições</strong>
          </text-area>
          <v-icon>mdi-account-cog</v-icon>
        </v-btn>
      </div>
      <div class="text-center mx-2">
        <v-btn rounded color="primary" dark>
          <text-area class="text-capitalize mx-1 .d-sm-none .d-md-flex">
            <strong>Sair</strong>
          </text-area>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-dialog v-model="logoutAlert" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">Deseja terminar sessão?</v-card-title>
        <v-card-text>Todos as suas alterações não guardadas serão perdidas.</v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="green darken-1" text @click="logoutAlert = false">Voltar Atrás</v-btn>
          <v-btn color="red darken-1" text @click="handleLogout">Terminar Sessão</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String
  },
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
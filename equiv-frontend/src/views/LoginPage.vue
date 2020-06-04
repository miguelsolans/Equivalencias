<template>
  <v-container class="fill-height" fluid>
    <Login></Login>
  </v-container>
</template>

<script>
import Login from "../components/LoginPage/Login";
export default {
  name: "LoginPage",
  components: { Login }
};
</script>

<style scoped>
* {
  font-family: "Rubik", sans-serif;
}
</style>
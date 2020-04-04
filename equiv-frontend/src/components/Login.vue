<template>
    <v-form ref="from" lazy-validation>
        <v-container fluid>
            <v-row>

            </v-row>
        </v-container>
        <v-text-field label="Username" name="username"></v-text-field>

        <v-text-field label="Password" name="password"
                      :append-icon="value ? 'visibility' : 'visibility_off'"
                      @click:append="() => (value = !value)"
                      :type="value ? 'password' : 'text'"></v-text-field>
    </v-form>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>
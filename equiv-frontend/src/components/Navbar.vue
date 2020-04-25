<template>
    <div>
        <button @click="handleLogout">Logout</button>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        methods: {
            handleLogout() {
                this.$store.dispatch('auth/logout')
                    .then(() => this.$router.push('/login'))
                    .catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped>

</style>
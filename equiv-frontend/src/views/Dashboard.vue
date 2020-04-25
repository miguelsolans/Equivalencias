<template>
    <div>
        <NewProcess/>
        <ListProcess/>
    </div>
</template>

<script>
    import NewProcess from '../components/NewProcess';
    import ListProcess from '../components/ListProcess';
    export default {
        name: "Dashboard",
        components: {
            NewProcess,
            ListProcess
        }
    }
</script>

<style scoped>

</style>
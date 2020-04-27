<template>
    <div>
        <h2>Gestão do Processo</h2>
        <Equivalences/>
        <NewEquivalence/>
    </div>
</template>

<script>
    import Equivalences from '../components/StudentEquivalences';
    import NewEquivalence from '../components/NewEquivalence'
    export default {
        name: "Student",
        components: { Equivalences, NewEquivalence }
    }
</script>

<style scoped>

</style>
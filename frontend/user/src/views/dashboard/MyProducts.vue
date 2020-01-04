<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="d-inline">My Accounts</h5>
            <a class="btn button-primary btn-my-effect" href="/addproduct">Add Account</a>
        </div>
        <div class="row">
            <no-data></no-data>
        </div>

    </div>
</template>

<script>
    import NoData from '../components/Dashboard/NoData';

    export default {
        name: "MyProducts",
        components: {
            NoData
        }
    }
</script>

<style scoped>

</style>
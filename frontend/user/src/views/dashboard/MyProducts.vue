<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="d-inline">My Accounts</h5>
            <a class="btn button-primary btn-grad-effect" href="/addproduct">Add Account</a>
        </div>
        <div class="row">
<!--            <no-data></no-data>-->
            <product-pad></product-pad>
        </div>

    </div>
</template>

<script>
    import NoData from '../components/Dashboard/NoData';
    import ProductPad from '../components/Dashboard/ProductPad';

    export default {
        name: "MyProducts",
        components: {
            ProductPad
        }
    }
</script>

<style scoped>

</style>
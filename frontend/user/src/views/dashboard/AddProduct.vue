<template>
    <add-product-insights>
    </add-product-insights>
</template>

<script>
    import AddProductInsights from "../components/Dashboard/AddProductInsights";

    export default {
        name: "AddProduct",
        components: {
            AddProductInsights
        },
        data () {
            return {
                status_enum : {
                    check : "check",
                    verify: "verify",
                },
                status : this.status_enum.check,
            }
        }
    }
</script>

<style scoped>

</style>
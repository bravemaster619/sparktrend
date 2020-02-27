<template>
    <div class="status_card h-100">
        <div class="d-flex flex-column card card-transparent text-center h-100">
            <h2 class="text-primary">
                <span class="text-cement-grey">$</span>{{amount.toFixed(2)}}
            </h2>
            <div class="dashboard-home-title text-center text-uppercase">{{title}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "status-card",
        props: {
            title: {
                type: String,
            },
            amount: {
                type: Number,
                default: 0.00
            }
        }
    }
</script>

<style scoped>

</style>
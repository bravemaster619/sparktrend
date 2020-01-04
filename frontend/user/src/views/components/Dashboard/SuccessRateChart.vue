<template>
    <div class="d-flex flex-column text-center h-100 justify-content-center">
        <div class="container p-0">
            <pie-chart :chart-data="datacollection"></pie-chart>
        </div>
        <h2 class="text-neon-green">{{success_rate}}%</h2>
        <div class="dashboard-home-title">SUCCESS RATE</div>
    </div>
</template>

<script>
    import PieChart from '../../../plugins/PieChart.js';
    export default {
        name: "success-rate-chart",
        props:{
            success_shout: Number,
            success_rate: Number
        },
        components: {
            PieChart
        },
        data () {
            return {
                datacollection: null
            }
        },
        mounted() {
            this.fillData()
        },
        methods: {
            fillData() {
                this.datacollection = {
                    labels: ['success', 'failed'],
                    datasets: [
                        {
                            label: "Success Rate",
                            backgroundColor: ['#57bc70', '#46bfbd'],
                            data: [this.success_shout, this.success_rate === 0 ? 0 : (this.success_shout * 100 / this.success_rate - this.success_shout).toFixed(2)]
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
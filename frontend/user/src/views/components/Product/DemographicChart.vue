<template>
    <div class="d-flex flex-column text-center h-100 justify-content-center">
        <div class="container p-0">
            <doughnut-chart v-bind:chart-data="dataCollection" :options="chartOptions"></doughnut-chart>
        </div>
    </div>
</template>
<script>
    import DoughnutChart from "../../../plugins/DoughnutChart";
    export default {
       components: {DoughnutChart},
       props: {
          dataCollection: Object,
       },
       data() {
          return {
             chartOptions: {
                legend: {
                   position: 'right'
                }
             }
          }
       }
    }
</script>
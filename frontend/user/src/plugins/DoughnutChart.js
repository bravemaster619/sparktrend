import {mixins, Doughnut} from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
   extends: Doughnut,
   mixins: [ reactiveProp ],
   props: ['options', 'chartData'],

   mounted() {
      this.renderChart(this.chartData, this.options);
   }
}
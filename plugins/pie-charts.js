import Vue from 'vue';
import { Pie, mixins }  from 'vue-chartjs';
const { reactiveProp } = mixins

Vue.component('PieChart', {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.chartData)
  }
})

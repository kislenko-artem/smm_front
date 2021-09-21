import Vue from 'vue';
import { Pie }  from 'vue-chartjs';

Vue.component('PieChart', {
  extends: Pie,
  props: ['data'],
  mounted () {
    this.renderChart(this.data)
  }
})

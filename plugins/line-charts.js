import Vue from 'vue';
import { Line }  from 'vue-chartjs';

Vue.component('LineChart', {
  extends: Line,
  props: ['data'],
  mounted () {
    this.renderChart(this.data)
  }
})

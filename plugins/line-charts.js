import Vue from 'vue';
import { Line, mixins }  from 'vue-chartjs';
const { reactiveProp } = mixins

Vue.component('LineChart', {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.chartData, {
      maintainAspectRatio:false
    })
  }
})

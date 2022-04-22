import Vue from 'vue';
import { Bar, mixins }  from 'vue-chartjs';
const { reactiveProp } = mixins

Vue.component('BarChart', {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.chartData, {
      maintainAspectRatio:false
    })
  }
})

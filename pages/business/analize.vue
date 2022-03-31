<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Аналитика</h3>
      </div>
      <div class="manage-data">
        <input type="date" v-model="dtStartModel" class="income-filter"/>
        <input type="date" v-model="dtEndModel" class="income-filter"/>
        <div class="buttons">
          <button v-on:click="updateData">Обновить</button>
        </div>
      </div>
      <div class="chart-item" v-if="readySource">
        <div>
          <h4>Источники клиентов</h4>
          <PieChart :chartData="sourcesChart"></PieChart>
        </div>
        <div>
          <h4>Типы клиентов </h4>
          <PieChart :chartData="typeClientChart"></PieChart>
        </div>

      </div>

      <div class="chart-item" v-if="readyOperation">
        <div>
          <h4>Доход по типам</h4>
          <PieChart :chartData="sourcesOperationsChart"></PieChart>
        </div>
        <div>
          <h4>Доход по источникам</h4>
          <PieChart :chartData="typeOperationsClientChart"></PieChart>
        </div>
      </div>

      <div class="chart-item-line" v-if="readyOperation">
        <h4>График доходов\расходов</h4>
        <LineChart :chartData="operationsChart"></LineChart>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'account',
  data: () => {
    return {
      dtStartModel:"",
      dtEndModel: "",
      search: "",
      clientsSources: [],
      services: [],
      types: [],
      clients: [],
      operations: [],
      colors: ["#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A", "#DC143C", "#FF0000", "#B22222", "#8B0000",
        "#FFC0CB", "#FF69B4", "#FF1493", "#C71585", "#DB7093", "#98FB98", "#00FA9A", "#00FF7F", "#228B22", "#006400",
        "#FFD700", "#FFFF00", "#00FFFF", "#7FFFD4", "#5F9EA0", "#4682B4", "#E6E6FA", "#DDA0DD", "#4B0082", "#FFF5EE", ],

      sourcesChart:{},
      typeClientChart:{},
      readySource: false,

      operationsChart:{},
      sourcesOperationsChart:{},
      typeOperationsClientChart:{},
      readyOperation: false,
    }
  },
  beforeMount() {
    this.getClients();
    this.getOperations();

  },
  methods: {
    updateData() {
      this.getClients();
      this.getOperations();
    },
    getOperations() {
      const self = this;
      self.readyOperation = false;
      let url = "/v0/business/incomes/incomes?";
      if (this.dtStartModel) {
        url += "&dt_start=" + this.dtStartModel +"T00:00:00"
      }
      if (this.dtEndModel) {
        url += "&dt_end=" + this.dtEndModel +"T23:59:59"
      }
      fetch(process.env.baseUrl + url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.operations = data.results;

          let sources = {}
          let types = {}
          let operations = {}
          let price = 0;
          data.results.sort( (a, b) => {
            if ( a.dt_provision < b.dt_provision ){
              return -1;
            }
            return 1;
          });
          for (let key in data.results) {
            price += parseFloat(data.results[key].price);
            operations[data.results[key].dt_provision] = price;

            if (data.results[key].client != undefined) {
              if (data.results[key].client.category != undefined) {
                if (sources[data.results[key].client.category["name"]] == undefined) {
                  sources[data.results[key].client.category["name"]] = 0;
                }
                sources[data.results[key].client.category["name"]] += data.results[key].price;
              }

              if (data.results[key].client.type_client != undefined) {
                if (types[data.results[key].client.type_client["name"]] == undefined) {
                  types[data.results[key].client.type_client["name"]] = 0;
                }
                types[data.results[key].client.type_client["name"]] += data.results[key].price;
              }
            }
          }

          self.operationsChart.labels = [];
          self.operationsChart.datasets = [{label: "Доходы", data: []}];
          for (let key in operations) {
            self.operationsChart.labels.push(key);
            self.operationsChart.datasets[0].data.push(operations[key]);
          }

          self.sourcesOperationsChart.labels = [];
          self.sourcesOperationsChart.datasets = [{data: [], backgroundColor: []}];
          let counter = 0;
          for (let key in sources) {
            self.sourcesOperationsChart.labels.push(key);
            self.sourcesOperationsChart.datasets[0].data.push(sources[key]);
            self.sourcesOperationsChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter++;
          }

          self.typeOperationsClientChart.labels = [];
          self.typeOperationsClientChart.datasets = [{data: [], backgroundColor: []}];
          counter = 0;
          for (let key in types) {
            self.typeOperationsClientChart.labels.push(key);
            self.typeOperationsClientChart.datasets[0].data.push(types[key]);
            self.typeOperationsClientChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter++;
          }
          self.readyOperation = true;

        })
    },
    getClients() {
      const self = this;
      self.readySource = false;
      let url = "/v0/business/clients/clients?";
      if (this.dtStartModel) {
        url += "&dt_start=" + this.dtStartModel +"T00:00:00"
      }
      if (this.dtEndModel) {
        url += "&dt_end=" + this.dtEndModel +"T23:59:59"
      }
      fetch(process.env.baseUrl + url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          let sources = {}
          let types = {}
          for (let key in data.results) {

            if (data.results[key].category != undefined) {
              if (sources[data.results[key].category["name"]] == undefined) {
                sources[data.results[key].category["name"]] = 0;
              }
              sources[data.results[key].category["name"]]++;
            }

            if (data.results[key].type_client != undefined) {
              if (types[data.results[key].type_client["name"]] == undefined) {
                types[data.results[key].type_client["name"]] = 0;
              }
              types[data.results[key].type_client["name"]]++;
            }
          }

          self.sourcesChart.labels = [];
          self.sourcesChart.datasets = [{data: [], backgroundColor: []}];
          let counter = 0;
          for (let key in sources) {
            self.sourcesChart.labels.push(key);
            self.sourcesChart.datasets[0].data.push(sources[key]);
            self.sourcesChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter++;
          }

          self.typeClientChart.labels = [];
          self.typeClientChart.datasets = [{data: [], backgroundColor: []}];
          counter = 0;
          for (let key in types) {
            self.typeClientChart.labels.push(key);
            self.typeClientChart.datasets[0].data.push(types[key]);
            self.typeClientChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter++;
          }
          self.readySource = true;
        })
    },
  }
}
</script>

<style>
.account-content {
  display: flex;
}

.account-right {
  padding: 10px;
}
.chart-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.chart-item-line {
  width: 100%;
}

.chart-item div {
  width: 50%;
}
@media screen and (max-width: 450px) {
  .chart-item div {
    width: 100%;
  }
}

</style>

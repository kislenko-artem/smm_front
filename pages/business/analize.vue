<template>
  <div class="account-wrapper">
    <Sidebar />
    <div id="content">
      <div id="content-header">
        <h3>Финансовая аналитика</h3>
      </div>
      <div class="manage-data">
        <input type="date" v-model="dtStartModel" class="income-filter" />
        <input type="date" v-model="dtEndModel" class="income-filter" />
        <select class="office-filter" v-model.trim="officeModel">
          <option value="" disabled selected>Филиал</option>
          <option v-for="c in offices" :value="c.id">{{ c.name }}</option>
        </select>
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

      <div class="chart-item" v-if="readyNewOperation">
        <div>
          <h4>Доход по типам (новые)</h4>
          <PieChart :chartData="sourcesOperationsNewChart"></PieChart>
        </div>
        <div>
          <h4>Доход по источникам (новые)</h4>
          <PieChart :chartData="typeOperationsNewClientChart"></PieChart>
        </div>
        <div>
          <h4>Расходы</h4>
          <PieChart :chartData="expensesChart"></PieChart>
        </div>
      </div>

      <div class="chart-item-line" v-if="readyOperation">
        <h4>Прибыль</h4>
        <LineChart :chartData="operationsChart" :width="300" :height="300"></LineChart>

        <h4>Доход</h4>
        <LineChart :chartData="incomesChart" :width="300" :height="300"></LineChart>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'account',
  data: () => {
    return {
      dtStartModel: "",
      dtEndModel: "",
      officeModel: "",
      search: "",
      clientsSources: [],
      services: [],
      types: [],
      offices: [],
      clients: [],
      operations: [],
      colors: ["#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A", "#DC143C", "#FF0000", "#B22222", "#8B0000",
        "#FFC0CB", "#FF69B4", "#FF1493", "#C71585", "#DB7093", "#98FB98", "#00FA9A", "#00FF7F", "#228B22", "#006400",
        "#FFD700", "#FFFF00", "#00FFFF", "#7FFFD4", "#5F9EA0", "#4682B4", "#E6E6FA", "#DDA0DD", "#4B0082", "#FFF5EE",],

      sourcesChart: {},
      typeClientChart: {},
      readySource: false,

      operationsChart: {},
      incomesChart: {},
      sourcesOperationsChart: {},
      typeOperationsClientChart: {},
      expensesChart: {},
      readyOperation: false,

      typeOperationsNewClientChart: {},
      sourcesOperationsNewChart: {},
      readyNewOperation: false,
    }
  },
  beforeMount() {
    this.getOffices();
    this.updateData();
  },
  methods: {
    updateData() {
      this.getClients();
      this.getOperations();
      this.getOperationsNew();
    },
    getOffices() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/offices/all")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          for (let key in data.results) {
            self.offices.push(data.results[key]);
          }
        })
    },
    getOperations() {
      const self = this;
      self.readyOperation = false;
      let url = "/v0/business/incomes/incomes?";
      if (this.dtStartModel) {
        url += "&dt_start=" + this.dtStartModel + "T00:00:00"
      }
      if (this.dtEndModel) {
        url += "&dt_end=" + this.dtEndModel + "T23:59:59"
      }
      if (this.officeModel) {
        url += "&office_id=" + this.officeModel
      }
      fetch(process.env.baseUrl + url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.sourcesChart = {}
          self.typeClientChart = {}
          self.readySource = false

          self.operationsChart = {}
          self.incomesChart = {}
          self.sourcesOperationsChart = {}
          self.typeOperationsClientChart = {}
          self.expensesChart = {}
          self.readyOperation = false

          self.typeOperationsNewClientChart = {}
          self.sourcesOperationsNewChart = {}
          self.readyNewOperation = false

          self.operations = data.results;

          let sources = {}
          let types = {}
          let operations = {}
          let price = 0;
          let positivePrice = 0;
          let positiveOperations = {}
          let negativeOperations = {}
          data.results.sort((a, b) => {
            if (a.dt_provision < b.dt_provision) {
              return -1;
            }
            return 1;
          });

          var prevMonth = -1
          for (let key in data.results) {
            var numPrice = parseFloat(data.results[key].price)

            price += numPrice;
            operations[data.results[key].dt_provision] = price;

            if (numPrice > 0) {
              var dt = new Date(Date.parse(data.results[key].dt_provision));
              if (dt.getMonth() !== prevMonth) {
                positivePrice = 0
              }
              prevMonth = dt.getMonth();
              positivePrice += numPrice;
              positiveOperations[data.results[key].dt_provision] = positivePrice;
            } else {
              let name = data.results[key].subcategory.name;
              if (negativeOperations[name] == undefined) {
                negativeOperations[name] = 0;
              }
              negativeOperations[name] += numPrice;
            }

            if (data.results[key].client) {

              if (data.results[key].client.subcategory) {
                if (sources[data.results[key].client.subcategory["name"]] === undefined) {
                  sources[data.results[key].client.subcategory["name"]] = 0;
                }
                sources[data.results[key].client.subcategory["name"]] += data.results[key].price;
              }

              if (data.results[key].client.type_client !== undefined) {
                if (types[data.results[key].client.type_client["name"]] === undefined) {
                  types[data.results[key].client.type_client["name"]] = 0;
                }
                types[data.results[key].client.type_client["name"]] += data.results[key].price;
              }
            }
          }

          self.expensesChart.labels = [];
          self.expensesChart.datasets = [{ label: "Расходы", data: [], backgroundColor: [] }];
          let counter = 0;
          for (let key in negativeOperations) {
            self.expensesChart.labels.push(key);
            self.expensesChart.datasets[0].data.push(negativeOperations[key]);
            self.expensesChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter += 1;
          }

          self.operationsChart.labels = [];
          self.operationsChart.datasets = [{ label: "Прибыль", data: [] }];

          self.incomesChart.labels = [];
          self.incomesChart.datasets = [{ label: "Доход", data: [] }];
          for (let key in operations) {
            self.operationsChart.labels.push(key);
            self.operationsChart.datasets[0].data.push(operations[key]);
          }
          for (let key in positiveOperations) {
            self.incomesChart.labels.push(key);
            self.incomesChart.datasets[0].data.push(positiveOperations[key]);
          }

          self.sourcesOperationsChart.labels = [];
          self.sourcesOperationsChart.datasets = [{ data: [], backgroundColor: [] }];
          counter = 0;
          for (let key in sources) {
            self.sourcesOperationsChart.labels.push(key);
            self.sourcesOperationsChart.datasets[0].data.push(sources[key]);
            self.sourcesOperationsChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter++;
          }

          self.typeOperationsClientChart.labels = [];
          self.typeOperationsClientChart.datasets = [{ data: [], backgroundColor: [] }];
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
    getOperationsNew() {
      const self = this;
      self.readyNewOperation = false;
      let url = "/v0/business/incomes/incomes?";
      // if (this.dtStartModel) {
      //   url += "&dt_start=" + this.dtStartModel +"T00:00:00"
      // }
      if (this.dtEndModel) {
        url += "&dt_end=" + this.dtEndModel + "T23:59:59"
      }
      if (this.officeModel) {
        url += "&office_id=" + this.officeModel
      }
      fetch(process.env.baseUrl + url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {

          let sourcesNew = {}
          let typesNew = {}
          let clientChecker = {}
          data.results.sort((a, b) => {
            if (a.dt_provision < b.dt_provision) {
              return -1;
            }
            return 1;
          });

          for (let key in data.results) {

            if (!data.results[key].client) {
              continue;
            }
            if (clientChecker[data.results[key].client.id]) {
              continue
            }
            clientChecker[data.results[key].client.id] = true;
            if (this.dtStartModel !== "") {
              var dtProvision = new Date(Date.parse(data.results[key].dt_provision));
              var dtStart = new Date(Date.parse(this.dtStartModel));
              if (dtStart > dtProvision) {
                continue;
              }
            }
            if (data.results[key].client.subcategory !== undefined) {
              if (!data.results[key].client.subcategory) {
                continue
              }
              if (sourcesNew[data.results[key].client.subcategory["name"]] === undefined) {
                sourcesNew[data.results[key].client.subcategory["name"]] = 0;
              }
              sourcesNew[data.results[key].client.subcategory["name"]] += data.results[key].price;
            }

            if (data.results[key].client.type_client !== undefined) {
              if (typesNew[data.results[key].client.type_client["name"]] === undefined) {
                typesNew[data.results[key].client.type_client["name"]] = 0;
              }
              typesNew[data.results[key].client.type_client["name"]] += data.results[key].price;
            }



          }


          self.sourcesOperationsNewChart.labels = [];
          self.sourcesOperationsNewChart.datasets = [{ data: [], backgroundColor: [] }];
          let counter = 0;
          for (let key in sourcesNew) {
            self.sourcesOperationsNewChart.labels.push(key);
            self.sourcesOperationsNewChart.datasets[0].data.push(sourcesNew[key]);
            self.sourcesOperationsNewChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter++;
          }

          self.typeOperationsNewClientChart.labels = [];
          self.typeOperationsNewClientChart.datasets = [{ data: [], backgroundColor: [] }];
          counter = 0;
          for (let key in typesNew) {
            self.typeOperationsNewClientChart.labels.push(key);
            self.typeOperationsNewClientChart.datasets[0].data.push(typesNew[key]);
            self.typeOperationsNewClientChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter++;
          }

          self.readyNewOperation = true;

        })
    },
    getClients() {
      const self = this;
      self.readySource = false;
      let url = "/v0/business/clients/clients?";
      if (this.dtStartModel) {
        url += "&dt_start=" + this.dtStartModel + "T00:00:00"
      }
      if (this.dtEndModel) {
        url += "&dt_end=" + this.dtEndModel + "T23:59:59"
      }
      fetch(process.env.baseUrl + url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          let sources = {}
          let types = {}
          for (let key in data.results) {

            if (data.results[key].subcategory != undefined) {
              if (sources[data.results[key].subcategory["name"]] == undefined) {
                sources[data.results[key].subcategory["name"]] = 0;
              }
              sources[data.results[key].subcategory["name"]]++;
            }

            if (data.results[key].type_client != undefined) {
              if (types[data.results[key].type_client["name"]] == undefined) {
                types[data.results[key].type_client["name"]] = 0;
              }
              types[data.results[key].type_client["name"]]++;
            }
          }

          self.sourcesChart.labels = [];
          self.sourcesChart.datasets = [{ data: [], backgroundColor: [] }];
          let counter = 0;
          for (let key in sources) {
            self.sourcesChart.labels.push(key);
            self.sourcesChart.datasets[0].data.push(sources[key]);
            self.sourcesChart.datasets[0].backgroundColor.push(self.colors[counter]);
            counter++;
          }

          self.typeClientChart.labels = [];
          self.typeClientChart.datasets = [{ data: [], backgroundColor: [] }];
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

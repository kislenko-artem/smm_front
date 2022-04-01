<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Аналитика по возращаемости</h3>
      </div>
      <div class="manage-data">
        <input type="date" v-model="dtStartModel" class="income-filter"/>
        <input type="date" v-model="dtEndModel" class="income-filter"/>
        <div class="buttons">
          <button v-on:click="updateData">Обновить</button>
        </div>
      </div>
      <h5>для корректного отображения, конечная дата, должна быть последний день месяца</h5>
      <div class="chart-item"  v-if="readyOperation">
        <div v-for="(item, index) in data">
          Возвращаемость по: {{ index }}
          <PieChart :chartData="item"></PieChart>
        </div>
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
      types: [],
      data: {},
      readyOperation: false,
      colors: ["#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A", "#DC143C", "#FF0000", "#B22222", "#8B0000",
        "#FFC0CB", "#FF69B4", "#FF1493", "#C71585", "#DB7093", "#98FB98", "#00FA9A", "#00FF7F", "#228B22", "#006400",
        "#FFD700", "#FFFF00", "#00FFFF", "#7FFFD4", "#5F9EA0", "#4682B4", "#E6E6FA", "#DDA0DD", "#4B0082", "#FFF5EE", ],
    }
  },
  beforeMount() {
    this.updateData();

  },
  methods: {
    c_filter: function (data, filter) {
      for (var key in data) {
        if (key !== filter) {
          continue
        }
        return data[key];
      }
      return ""
    },
    updateData() {
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

          data.results.sort( (a, b) => {
            if ( a.dt_provision < b.dt_provision ){
              return -1;
            }
            return 1;
          });
          var lastKeyDt = ""
          for (let key in data.results) {
            var dt = new Date(Date.parse(data.results[key].dt_provision));
            lastKeyDt = dt.getFullYear().toString() + " " + dt.getMonth();
          }

          var agregator = {}
          for (let key in data.results) {
            var numPrice = parseFloat(data.results[key].price)
            if (numPrice < 0) {
              continue
            }
            if (!data.results[key].client) {
              continue
            }
            var dt = new Date(Date.parse(data.results[key].dt_provision));
            var keyDate = dt.getFullYear().toString() + " " + dt.getMonth();
            var client_type_name = data.results[key].client.type_client.name;

            if (agregator[client_type_name] === undefined) {
              agregator[client_type_name] = {}
            }

            // не учитывать новых клиентов этого месяца
            if (keyDate === lastKeyDt && agregator[client_type_name][data.results[key].client.id] === undefined) {
              continue
            }
            if (agregator[client_type_name][data.results[key].client.id] === undefined) {
              agregator[client_type_name][data.results[key].client.id] = 0;
            }
            agregator[client_type_name][data.results[key].client.id] += 1;
          }
          for (var key in agregator) {
            self.data[key] = {}
            self.data[key].labels = [];
            self.data[key].datasets = [{data: [], backgroundColor: []}];
            var finishAgregator = {}
            for (let d in agregator[key]) {
              if (finishAgregator[agregator[key][d]] == undefined) {
                finishAgregator[agregator[key][d]] = 0;
              }
              finishAgregator[agregator[key][d]] += 1;
            }
            let counter = 0;
            for (let d in finishAgregator) {
              var label = "Вернулось раз: " + d;
              if (d == 1) {
                label = "Не вернулось"
              }
              self.data[key].labels.push(label);
              self.data[key].datasets[0].data.push(finishAgregator[d]);
              self.data[key].datasets[0].backgroundColor.push(self.colors[counter]);
              counter++;

            }
          }
          self.readyOperation = true;
        })
    }
  }
}
</script>

<style>
table.table-clients {
  display: block;
  margin: 0 auto;
  width: 800px;
}

table.table-clients td {
  text-align: center;
  width: 16%;
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

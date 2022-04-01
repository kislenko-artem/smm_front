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
      В разработке

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

          var months = ["Январь", "Февраль", "Март", "Апрель", "Мая", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ]
          var agregator = {}
          for (let key in data.results) {
            var numPrice = parseFloat(data.results[key].price)
            if (numPrice < 0) {
              continue
            }
            var dt = new Date(Date.parse(data.results[key].dt_provision));
            var keyDate = dt.getFullYear().toString() + " " + months[dt.getMonth()];
            if (agregator[keyDate] === undefined) {
              agregator[keyDate] = {"income":0, "avg_income": 0, "total_count": 0, "types_client": {}}
            }
            if (!data.results[key].client) {
              continue
            }
            agregator[keyDate].income += numPrice;
            agregator[keyDate].total_count += 1;
            var client_type_name = data.results[key].client.type_client.name;
            if (agregator[keyDate].types_client[client_type_name] === undefined) {
              agregator[keyDate].types_client[client_type_name] = 0;
            }
            agregator[keyDate].types_client[client_type_name] += 1;
          }
          self.data = agregator;
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

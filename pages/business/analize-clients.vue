<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Аналитика по клиентам</h3>
      </div>
      <div class="manage-data">
        <input type="date" v-model="dtStartModel" class="income-filter"/>
        <input type="date" v-model="dtEndModel" class="income-filter"/>
        <select  class="office-filter"  v-model.trim="officeModel">
          <option value="" disabled selected>Филиал</option>
          <option v-for="c in offices" :value="c.id">{{ c.name }}</option>
        </select>
        <div class="buttons">
          <button v-on:click="updateData">Обновить</button>
        </div>
      </div>
      <table class="table-clients">
        <tr>
          <td>Дата</td>
          <td>Поступления</td>
          <td>Средн. Чек</td>
          <td>Всего чел-к</td>
          <td>Клиент / Нов.</td>
          <td>Модель / Нов.</td>
          <td>Ученик / Нов.</td>
        </tr>
        <tr v-for="(item, index) in data">
          <td>{{ index }}</td>
          <td>{{ item.income }}</td>
          <td>{{ parseInt(item.income/item.total_count) }}</td>
          <td>{{ item.total_count }}</td>
          <td>
            {{ c_filter(item.types_client, 'Клиент') }} / {{ c_filter(item.new_types_client, 'Клиент') }}
          </td>
          <td>
            {{ c_filter(item.types_client, 'Модель') }} / {{ c_filter(item.new_types_client, 'Модель') }}
          </td>
          <td>
            {{ c_filter(item.types_client, 'Ученик') }} / {{ c_filter(item.new_types_client, 'Ученик') }}
          </td>
<!--          <td><a :href = "'https://vk.com/' + item.screen_name" target="_blank">{{ item.name }}</a></td>-->
<!--          <td><img :src=item.photo_50 /></td>-->
        </tr>
      </table>

      <section class="chart-group">
        <label>Группировать по: </label>
        <button v-on:click="setGroupByDay">День</button>
        <button v-on:click="setGroupByWeek">Неделя</button>
        <button v-on:click="setGroupByMonth">Месяц</button>
      </section>
      <div class="chart-bar"  v-if="readyOperation">
        <BarChart :chartData="agregateData"></BarChart>
      </div>

    </div>
  </div>
</template>

<script>
const groupDay = "day";
const groupMonth = "month";
const groupWeek = "week";

export default {
  layout: 'account',
  data: () => {
    return {
      dtStartModel:"",
      dtEndModel: "",
      officeModel: "",
      types: [],
      data: {},
      agregateData: {},
      readyOperation: false,
      groupBy: groupDay,
      offices: [],
    }
  },
  beforeMount() {
    this.getOffices();
    this.updateData();

  },
  methods: {
    setGroupByDay() {
      this.groupBy = groupDay;
      this.updateData();
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
    setGroupByMonth() {
      this.groupBy = groupMonth;
      this.updateData();
    },
    setGroupByWeek() {
      this.groupBy = groupWeek;
      this.updateData();
    },
    nameGroupBy() {
      switch (this.groupBy) {
        case groupDay:
          return "по дням";
        case groupWeek:
          return "по неделям";
        case groupMonth:
          return "по месяцам";
      }
    },
    c_filter: function (data, filter) {
      for (var key in data) {
        if (key !== filter) {
          continue
        }
        return data[key];
      }
      return "-"
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
      if (this.officeModel) {
        url += "&office_id=" + this.officeModel
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

          var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ]
          var agregator = {}
          var uniqChecker = {}
          for (let key in data.results) {
            var numPrice = parseFloat(data.results[key].price)
            if (numPrice < 0) {
              continue
            }
            var dt = new Date(Date.parse(data.results[key].dt_provision));
            var keyDate = dt.getFullYear().toString() + " " + months[dt.getMonth()];
            if (agregator[keyDate] === undefined) {
              agregator[keyDate] = {"income":0, "avg_income": 0, "total_count": 0, "types_client": {}, "new_types_client": {}}
            }
            
            agregator[keyDate].income += numPrice;
            agregator[keyDate].total_count += 1;
            if (!data.results[key].client) {
              console.log(data.results[key]);
              continue;
            }
            var client_type_name = data.results[key].client.type_client.name;
            if (agregator[keyDate].types_client[client_type_name] === undefined) {
              agregator[keyDate].types_client[client_type_name] = 0;
            }
            agregator[keyDate].types_client[client_type_name] += 1;
            
            var clientName = data.results[key].client ? data.results[key].client.name : ""
            var clientPhone = data.results[key].client ? data.results[key].client.phone : ""
            var uniqKey = clientName + clientPhone;
            if (uniqChecker[uniqKey] !== undefined) {
              continue;
            }
            uniqChecker[uniqKey] = true;
            if (agregator[keyDate].new_types_client[client_type_name] === undefined) {
              agregator[keyDate].new_types_client[client_type_name] = 0;
            }
            agregator[keyDate].new_types_client[client_type_name] += 1;
          }
          self.data = agregator;

          self.agregateData.labels = [];
          self.agregateData.datasets = [{label: "Количество клиентов " + self.nameGroupBy(), data: []}];
          var counter = 0
          var prevVal = -1;
          var days = ["пн.", "вт.", "ср.", "чт.", "пт.", "сб.", "вс.", ]
          for (let key in data.results) {
            var dt = new Date(Date.parse(data.results[key].dt_provision));

            switch (this.groupBy) {
              case groupDay:
                var currentVal = dt.getDay();
                break;
              case groupWeek:
                var d = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
                // Set to nearest Thursday: current date + 4 - current day number
                // Make Sunday's day number 7
                d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
                // Get first day of year
                var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
                // Calculate full weeks to nearest Thursday
                var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
                var currentVal = weekNo;
                break;
              case groupMonth:
                var currentVal = dt.getMonth();
                break;
            }
            if (prevVal != currentVal) {
              var label = data.results[key].dt_provision;
              if (this.groupBy == groupWeek) {
                label += "; " + days[dt.getDay() - 1];
              }
              self.agregateData.labels.push(label);
              self.agregateData.datasets[0].data.push(counter);
              counter = 0;
              prevVal = currentVal
            }
            counter++;
          }


          self.readyOperation = true;
        });
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

.chart-group {
  margin-top: 20px;
  height: 30px;
}


.chart-bar div {
  width: 100%;
}
@media screen and (max-width: 450px) {
  .chart-item div {
    width: 100%;
  }
}

</style>

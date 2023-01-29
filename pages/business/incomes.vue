<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Поступления</h3>
      </div>
      <article>
        <h4>Список</h4>
        <hr/>
        <div class="manage-data">
          <input type="text" v-model.trim="searchQuery" placeholder="Фильтр..." class="income-filter"/>
          <input type="date" v-model="dtStartModel" class="income-filter"/>
          <input type="date" v-model="dtEndModel" class="income-filter"/>
          <div class="buttons">
            <button v-on:click="getContent">Обновить</button>
            <button v-on:click="toggleWin">Добавить</button>
          </div>
        </div>
        <hr/>
        <Grid
          :heroes="clients"
          :columns="clientsColumns"
          :filter-key="searchQuery"
          :methodsList="methodsList"
          className="income-table"
        />
        <div class="outcomes">
          <div><span>Доходы: </span><span>{{incomeModel}}</span></div>
          <div><span>Расходы: </span><span>{{expensesModel}}</span></div>
          <div><span>Прибыль: </span><span>{{profitModel}}</span></div>
        </div>
      </article>
    </div>

    <div class="pop-up" v-if="showPopUp">
      <div>
        <label>Филиал</label>
        <select v-model.trim="officeModel">
          <option value="" disabled selected>Филиал</option>
          <option v-for="c in offices" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Категория</label>
        <select v-model.trim="serviceModel">
          <option  value=""  disabled selected>Категория</option>
          <option v-for="c in services" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Подкатегория</label>
        <select v-model.trim="subcategoryModel">
          <option value="" disabled selected>Подкатегория</option>
          <option v-for="c in subcategoriesByCatID(serviceModel)" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Клиент</label>
        <select v-model.trim="clientModel">
          <option  value=""  disabled selected>Клиент</option>
          <option v-for="c in clientsSources" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Стоимость</label>
        <input type="text" value="" v-model.trim="priceModel" placeholder="Стоимость"/>
      </div>
      <div>
        <label>Продолжительность</label>
        <input type="text" value="" v-model.trim="durationModel" placeholder="Продолжительность"/>
      </div>
      <div>
        <label>Комментарии</label>
        <textarea v-model.trim="commentModel" placeholder="Комментарии"></textarea>
      </div>
      <div>
        <label>Дата</label>
        <input type="datetime-local" v-model="dtProvisionModel">
      </div>
      <div class="button-block">
        <button v-on:click="addContent">Добавить</button>
        <button v-on:click="toggleWin">Отмена</button>
      </div>
    </div>

    <div class="pop-up" v-if="showEditPopUp">
      <div>
        <label>Филиал</label>
        <select v-model.trim="officeModel">
          <option value="" disabled selected>Филиал</option>
          <option v-for="c in offices" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Категория</label>
        <select v-model.trim="serviceModel">
          <option  value=""  disabled selected>Категория</option>
          <option v-for="c in services" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Подкатегория</label>
        <select v-model.trim="subcategoryModel">
          <option value="" disabled selected>Подкатегория</option>
          <option v-for="c in subcategoriesByCatID(serviceModel)" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Клиент</label>
        <select v-model.trim="clientModel">
          <option  value=""  disabled selected>Клиент</option>
          <option v-for="c in clientsSources" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Стоимость</label>
        <input type="text" value="" v-model.trim="priceModel" placeholder="Стоимость"/>
      </div>
      <div>
        <label>Продолжительность</label>
        <input type="text" value="" v-model.trim="durationModel" placeholder="Продолжительность"/>
      </div>
      <div>
        <label>Комментарии</label>
        <textarea v-model.trim="commentModel" placeholder="Комментарии"></textarea>
      </div>
      <div>
        <label>Дата</label>
        <input type="datetime-local" v-model="dtProvisionModel">
      </div>
      <div class="button-block">
        <button v-on:click="updateContent(idModel)">Сохранить</button>
        <button v-on:click="toggleEditWin">Отмена</button>
      </div>
    </div>

    <div class="pop-up" v-if="showShowPopUp">
      <div class="show-element">
        <span>Название:</span><span>{{ officeName(serviceModel) }}</span>
      </div>
      <div class="show-element">
        <span>Филиал:</span><span>{{ sourceName(officeModel) | notEmpty }}</span>
      </div>
      <div class="show-element">
        <span>Подкат-рия:</span><span>{{ subcategoryModel | notEmpty }}</span>
      </div>
      <div class="show-element">
        <span>Цена:</span><span>{{ priceModel | notEmpty }}</span>
      </div>
      <div class="show-element">
        <span>Клиент:</span><span>{{ clientName(clientModel)}}</span>
      </div>
      <div class="show-element">
        <span>Длит.:</span><span>{{ durationModel | notEmpty }}</span>
      </div>
      <div class="show-element">
        <span>Дата:</span><span>{{ dtProvisionModel | notEmpty }}</span>
      </div>
      <div class="show-element-comment">
        {{ commentModel }}
      </div>
      <div class="button-block">
        <button v-on:click="toggleEditWin">Редактировать</button>
        <button v-on:click="toggleDelete(idModel)">Удалить</button>
        <button v-on:click="toggleShowWin">Отмена</button>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  layout: 'account',
  data: () => {
    return {
      searchQuery: "",
      dtStartModel: "",
      dtEndModel: "",
      incomeModel: 0,
      expensesModel: 0,
      profitModel: 0,

      showPopUp: false,
      showEditPopUp: false,
      showShowPopUp: false,

      clientsColumns: ["Филиал", "Категория", "Подкатегория", "Стоимость", "Комментарий", "Клиент", "Дата", "Продолжительность",
        "method:Удл.:id:delContent", "method:Ред.:id:editToggleContent", "method:Посм.:id:showToggleContent"],
      methodsList: {},

      clients: [],
      clientsSources: [],
      subcategories: {},
      offices: [],
      services: [],

      priceModel: "",
      commentModel: "",
      clientModel: 0,
      serviceModel: 0,
      subcategoryModel: 0,
      officeModel: 0,
      durationModel: 2,
      dtProvisionModel: "",
      idModel: 0,
    }
  },
  filters: {
    notEmpty(value) {
      if (!value) {
        return "-";
      }
      return value;
    }
  },
  mounted() {
    this.getContent();
    this.getServices();
    this.getClients();
    this.getSubCategories();
    this.getOffices();
    this.methodsList = {"delContent": this.delContent, "editToggleContent": this.editToggleContent, "showToggleContent": this.showToggleContent};
  },
  methods: {
    officeName(id) {
      let name = "-";
      for (let key in this.offices) {
        if (this.offices[key].id != id) {
          continue
        }
        name = this.offices[key].name;
        break;
      }
      return name;
    },
    sourceName(id) {
      let name = "-";
      for (let key in this.services) {
        if (this.services[key].id != id) {
          continue
        }
        name = this.services[key].name;
        break;
      }
      return name;
    },
    clientName(id) {
      let name = "-";
      for (let key in this.clientsSources) {
        if (this.clientsSources[key].id != id) {
          continue
        }
        name = this.clientsSources[key].name;
        break;
      }
      return name;
    },
    subcategoriesByCatID(catID) {
      if (!catID) {
        return [];
      }
      return this.subcategories[catID];
    },
    toggleWin() {
      this.showPopUp = !this.showPopUp;
    },
    toggleEditWin() {
      this.showShowPopUp = false;
      this.showEditPopUp = !this.showEditPopUp;
    },
    toggleDelete(id) {
      this.showShowPopUp = false;
      this.showEditPopUp = false;
      this.delContent(id);
    },
    toggleShowWin() {
      this.showShowPopUp = !this.showShowPopUp;
    },
    showToggleContent(id) {
      this.fillModels(id);
      this.toggleShowWin();

    },
    fillModels(id) {
      let data = {};
      for (let key in this.clients) {
        if (this.clients[key]["id"] != id) {
          continue
        }
        data = this.clients[key];
        break
      }
      this.priceModel = data["Стоимость"];
      this.clientModel = data["client_id"];
      this.serviceModel = data["category_id"];
      this.subcategoryModel = data["subcategory_id"];
      this.officeModel = data["office_id"];
      this.commentModel = data["Комментарий"];
      this.dtProvisionModel = data["Дата"];
      this.durationModel = data["Продолжительность"];
      this.idModel = id;
    },
    editToggleContent(id) {
      this.fillModels(id);
      this.showEditPopUp = true;
    },
    getContent() {
      const self = this;
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
          self.incomeModel = 0;
          self.expensesModel = 0;
          self.profitModel = 0;
          self.clients = [];
          for (let key in data.results) {
            if (data.results[key]["price"] > 0) {
              self.incomeModel += parseFloat(data.results[key]["price"]);
            } else {
              self.expensesModel += parseFloat(data.results[key]["price"]);
            }
            self.profitModel += parseFloat(data.results[key]["price"]);
            let d = {
              "Стоимость": data.results[key]["price"],
              "Категория": data.results[key]["category"]["name"],
              "Комментарий": data.results[key]["comments"],
              "Продолжительность": data.results[key]["duration"],
              "id": data.results[key]["id"],
              "category_id": data.results[key]["category"]["id"],
            }
            if (data.results[key]["dt_provision"]) {
              d["Дата"] = data.results[key]["dt_provision"]
            }
            if (data.results[key]["subcategory"]) {
              d["Подкатегория"] = data.results[key]["subcategory"]["name"]
              d["subcategory_id"] = data.results[key]["subcategory"]["id"]
            }
            if (data.results[key]["client"]) {
              d["Клиент"] = data.results[key]["client"]["name"]
              d["client_id"] = data.results[key]["client"]["id"]
            }
            if (data.results[key]["office"]) {
              d["Филиал"] = data.results[key]["office"]["name"]
              d["office_id"] = data.results[key]["office"]["id"]
            }

            self.clients.push(d);
          }
        })
    },
    addContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/incomes/incomes", {
        method: 'POST',
        body: JSON.stringify({
          price: self.priceModel,
          comments: self.commentModel,
          category_id: parseInt(self.serviceModel),
          office_id: parseInt(self.officeModel),
          subcategory_id: parseInt(self.subcategoryModel),
          client_id: parseInt(self.clientModel),
          dt_provision: self.dtProvisionModel.replace("T", " ") + ":00",
          duration: self.durationModel
        })
      })
        .then((data) => {
          this.getContent();
          this.showPopUp = false;
        });
    },
    updateContent(id) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/incomes/" + id, {
        method: 'PUT',
        body: JSON.stringify({
          price: self.priceModel,
          comments: self.commentModel,
          category_id: parseInt(self.serviceModel),
          office_id: parseInt(self.officeModel),
          subcategory_id: parseInt(self.subcategoryModel),
          client_id: parseInt(self.clientModel),
          dt_provision: self.dtProvisionModel.replace("T", " "),
          duration: self.durationModel
        })
      })
        .then((data) => {
          this.getContent();
          this.showEditPopUp = false;
        });
    },
    delContent(id) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/incomes/" + id, {
        method: 'DELETE',
      })
        .then((data) => {
          self.getContent();
        });

    },
    getClients() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/clients")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clientsSources = data.results;
        })
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
    getSubCategories() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/subcategories/all")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          for (let key in data.results) {
            if (self.subcategories[data.results[key].category.id] == undefined) {
              self.subcategories[data.results[key].category.id] = [];
            }
            self.subcategories[data.results[key].category.id].push(data.results[key]);
          }
        })
    },
    getServices() {
      const alias = "services";
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/" + alias)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.services = data.results;
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

.items-list {
  cursor: pointer;
}

.pop-up {
  top: 200px;
  margin: -200px auto;
  position: fixed;
  border: 1px solid black;
  background: #f2f2f2;
  padding: 20px 5px 10px 5px;
  width: 300px;
}

.pop-up > div {
  margin: 10px 0 10px 0;
}
.pop-up select {
  width: 100%;
}
.pop-up .button-block {
  display: flex;
  justify-content: space-between;
  margin: auto 0;
}
.pop-up input {
  width: 100%;
}

.pop-up label {
  font-size:12px;
  color: #666;
}
.pop-up textarea {
  width: 100%;
  height: 100px;
  resize: none;
}

.pop-up .show-element {
  font-size: 12px;
  display: flex;
  color: #3F454B;
  justify-content: flex-start;
}

.pop-up .show-element-comment {
  font-size: 12px;
  color: #3F454B;
}

.pop-up .show-element span:first-child {
  display: block;
  width: 80px;
}

.outcomes {
  margin: 20px 0 0 0;
  width: 300px;
}

.outcomes div {
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
}

.outcomes div span:first-child{
  font-weight: bold;
  display: block;
  width: 30px;
}

@media screen and (max-width: 450px) {
  .income-table th {
    font-size: 10px;
  }
  .income-table td span {
    font-size: 10px;
  }
  #content button {
    font-size: 10px;
    margin: 0;
  }
  .income-table  th:nth-child(1) {
    display: none;
  }

  .income-table  td:nth-child(1) {
    display: none;
  }
 
  .income-table  th:nth-child(2) {
    display: none;
  }

  .income-table  td:nth-child(2) {
    display: none;
  }

  .income-table  th:nth-child(4) {
    display: none;
  }

  .income-table  td:nth-child(4) {
    display: none;
  }

.income-table  td, .income-table  th {
    min-width: 20px;
    width: 20px;

}
  
  .income-table  td:nth-child(1) span {
    font-size: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 30px;
  }

  .income-table  td:nth-child(6) span {
    font-size: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 55px;
  }

  .income-table  th:nth-child(7) {
    display: none;
  }

  .income-table td:nth-child(7) {
    display: none;
  }

  .income-table  th:nth-child(8) {
    display: none;
  }

  .income-table td:nth-child(8) {
    display: none;
  }

  .income-table  th:nth-child(9) {
    display: none;
  }

  .income-table td:nth-child(9) {
    display: none;
  }
}

</style>

<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Управление клиентами</h3>
      </div>
      <article>
        <h4>Список клиентов</h4>
        <hr/>
        <div class="manage-data">
          <input type="text" v-model.trim="searchQuery" placeholder="Фильтр..."/>
          <select v-model.trim="officeModelFilter">
            <option value="" disabled selected>Филиал</option>
            <option v-for="c in offices" :value="c.id">{{ c.name }}</option>
          </select>
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
          className="clients-table"
        />
      </article>
    </div>

    <div class="pop-up" v-if="showPopUp">
      <div>
        <label>Имя</label>
        <input type="text" value="" v-model.trim="nameModel" placeholder="Имя"/>
      </div>
      <div>
        <label>Телефон</label>
        <input type="text" value="" v-model.trim="phoneModel" placeholder="Телефон"/>
      </div>
      <div>
        <label>Комментарии</label>
        <textarea v-model.trim="commentModel" placeholder="Комментарии"></textarea>
      </div>
      <div>
        <label>Филиал</label>
        <select v-model.trim="officeModel">
          <option value="" disabled selected>Филиал</option>
          <option v-for="c in offices" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Подкат-рия</label>
        <select v-model.trim="noteModel">
          <option value="" disabled selected>Подкат-рия</option>
          <option v-for="c in subcategoriesByCatID(sourceModel)" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Тип</label>
        <select v-model.trim="typeModel">
          <option value="" disabled selected>Тип</option>
          <option v-for="c in clients_types" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Дата появления</label>
        <input type="datetime-local" v-model="dtAppearModel">
      </div>
      <div class="button-block">
        <button v-on:click="addContent">Добавить</button>
        <button v-on:click="toggleWin">Отмена</button>
      </div>
    </div>

    <div class="pop-up" v-if="showEditPopUp">
      <div>
        <label>Имя</label>
        <input type="text" value="" v-model.trim="nameModel" placeholder="Имя"/>
      </div>
      <div>
        <label>Телефон</label>
        <input type="text" value="" v-model.trim="phoneModel" placeholder="Телефон"/>
      </div>
      <div>
        <label>Комментарии</label>
        <textarea v-model.trim="commentModel" placeholder="Комментарии"></textarea>
      </div>
      <div>
        <label>Филиал</label>
        <select v-model.trim="officeModel">
          <option value="" disabled selected>Филиал</option>
          <option v-for="c in offices" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Подкат-рия</label>
        <select v-model.trim="noteModel">
          <option value="" disabled selected>Подкат-рия</option>
          <option v-for="c in subcategoriesByCatID(sourceModel)" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Тип</label>
        <select v-model.trim="typeModel">
          <option value="" disabled selected>Тип</option>
          <option v-for="c in clients_types" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <label>Дата</label>
        <input type="datetime-local" v-model="dtAppearModel">
      </div>
      <div class="button-block">
        <button v-on:click="updateContent(idModel)">Сохранить</button>
        <button v-on:click="toggleEditWin">Отмена</button>
      </div>
    </div>

    <div class="pop-up" v-if="showShowPopUp">
      <div class="show-element">
        <span>Имя:</span><span>{{ nameModel | notEmpty }}</span>
      </div>
      <div class="show-element">
        <span>Телефон:</span><span>{{ phoneModel | notEmpty }}</span>
      </div>
      <div class="show-element">
        <span>Филиал:</span><span>{{ officeName(officeModel)  }}</span>
      </div>
      <div class="show-element">
        <span>Подкат-рия:</span><span>{{ noteModel | notEmpty }}</span>
      </div>
      <div class="show-element">
        <span>Тип:</span><span>{{ typeName(typeModel) }}</span>
      </div>
      <div class="show-element">
        <span>Дата появления:</span><span>{{ dtAppearModel | notEmpty }}</span>
      </div>
      <div class="show-element-comment">
        <span>{{ commentModel }}</span>
      </div>
      <div class="button-block">
        <button v-on:click="toggleEditWin">Редактировать</button>
        <button v-on:click="toggleDelete(idModel)">Удалить</button>
        <button v-on:click="toggleShowWin">Отмена</button>
      </div>

      <div class="client-incomes">
        <Grid
          :heroes="incomesByID()"
          :columns="incomesColumns"
          :filter-key="searchQuery"
          :methodsList="methodsList"
          className="client-income-table"
        />
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
      officeModelFilter: 0,

      showPopUp: false,
      showEditPopUp: false,
      showShowPopUp: false,

      clientsColumns: ["Филиал", "Имя", "Телефон", "Дата Связи", "Тип", "Комментарий", "Подкат-рия",
        "method:Удл.:id:delContent", "method:Ред.:id:editToggleContent", "method:Посм.:id:showToggleContent"],
      incomesColumns: ["Услуга", "Стоимость", "Комментарий", "Дата оказания"],
      methodsList: {},

      clients: [],
      incomes: [],
      clients_sources: [],
      clients_types: [],
      offices: [],
      subcategories: {},

      nameModel: "",
      phoneModel: "",
      commentModel: "",
      ageModel: 0,
      dtAppearModel: "",
      sourceModel: 29,
      officeModel: 0,
      typeModel: 0,
      noteModel: 5,
      idModel: 0,
    }
  },
  mounted() {
    this.getCategories();
    this.getSubCategories();
    this.getOffices();
    this.getTypes();
    this.getContent();
    this.getIncomes();
    this.methodsList = {
      "delContent": this.delContent,
      "editToggleContent": this.editToggleContent,
      "showToggleContent": this.showToggleContent
    };
  },
  filters: {
    notEmpty(value) {
      if (!value) {
        return "-";
      }
      return value;
    }
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
      for (let key in this.clients_sources) {
        if (this.clients_sources[key].id != id) {
          continue
        }
        name = this.clients_sources[key].name;
        break;
      }
      return name;
    },
    typeName(id) {
      let name = "-";
      for (let key in this.clients_types) {
        if (this.clients_types[key].id != id) {
          continue
        }
        name = this.clients_types[key].name;
        break;
      }
      return name;
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
    incomesByID() {
      let newIncomes = [];
      for (let key in this.incomes) {
        if (this.incomes[key]["client_id"] == undefined) {
          continue
        }
        if (this.incomes[key]["client_id"] != this.idModel) {
          continue
        }
        newIncomes.push(this.incomes[key]);
      }
      return newIncomes
    },
    subcategoriesByCatID(catID) {
      if (!catID) {
        return [];
      }
      return this.subcategories[catID];
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
      this.nameModel = data["Имя"];
      this.phoneModel = data["Телефон"];
      this.commentModel = data["Комментарий"];
      this.dtAppearModel = data["Дата Связи"];
      this.sourceModel = 29;
      this.typeModel = data["type_client"];
      this.noteModel = data["subcategory_id"];
      this.officeModel = data["office_id"];
      this.idModel = id;
    },
    editToggleContent(id) {
      this.fillModels(id);
      this.showEditPopUp = true;
    },
    getContent() {
      const self = this;
      let url = "/v0/business/clients/clients?";
      if (this.dtStartModel) {
        url += "&dt_start=" + this.dtStartModel +"T00:00:00"
      }
      if (this.dtEndModel) {
        url += "&dt_end=" + this.dtEndModel +"T23:59:59"
      }
      if (this.officeModelFilter > 0) {
        url += "&office_id=" + this.officeModelFilter
      }
      fetch(process.env.baseUrl + url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clients = [];
          for (let key in data.results) {
            let d = {
              "Имя": data.results[key]["name"],
              "Телефон": data.results[key]["phone"],
              "Комментарий": data.results[key]["comments"],
              "id": data.results[key]["id"],
            }
            if (data.results[key]["dt_appearance"]) {
              d["Дата Связи"] = data.results[key]["dt_appearance"]
            }
            if (data.results[key]["category"]) {
              d["Откуда"] = data.results[key]["category"]["name"]
              d["category_id"] = data.results[key]["category"]["id"]
            }
            if (data.results[key]["subcategory"]) {
              d["Подкат-рия"] = data.results[key]["subcategory"]["name"]
              d["subcategory_id"] = data.results[key]["subcategory"]["id"]
            }
            if (data.results[key]["type_client"]) {
              d["Тип"] = data.results[key]["type_client"]["name"]
              d["type_client"] = data.results[key]["type_client"]["id"]
            }
            if (data.results[key]["office"]) {
              d["Филиал"] = data.results[key]["office"]["name"]
              d["office_id"] = data.results[key]["office"]["id"]
            }
            self.clients.push(d);
          }
        })
    },
    getIncomes() {
      const self = this;
      let url = "/v0/business/incomes/incomes?";
      if (this.dtStartModel) {
        url += "&dt_start=" + this.dtStartModel + "T00:00:00"
      }
      if (this.dtEndModel) {
        url += "&dt_end=" + this.dtEndModel + "T23:59:59"
      }
      if (this.officeModelFilter > 0) {
        url += "&office_id=" + this.officeModelFilter
      }
      fetch(process.env.baseUrl + url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.incomes = [];
          for (let key in data.results) {
            let d = {
              "Стоимость": data.results[key]["price"],
              "Услуга": data.results[key]["category"]["name"],
              "Комментарий": data.results[key]["comments"],
              "Продолжительность": data.results[key]["duration"],
              "id": data.results[key]["id"],
              "category_id": data.results[key]["category"]["id"],
            }
            if (data.results[key]["dt_provision"]) {
              d["Дата оказания"] = data.results[key]["dt_provision"]
            }
            if (data.results[key]["client"]) {
              d["Клиент"] = data.results[key]["client"]["name"]
              d["client_id"] = data.results[key]["client"]["id"]
            }
            if (data.results[key]["office"]) {
              d["Филиал"] = data.results[key]["office"]["name"]
              d["office_id"] = data.results[key]["office"]["id"]
            }

            self.incomes.push(d);
          }
        })
    },
    addContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/clients", {
        method: 'POST',
        body: JSON.stringify({
          name: self.nameModel,
          phone: self.phoneModel,
          comments: self.commentModel,
          category_id: self.sourceModel,
          subcategory_id: self.noteModel,
          type_client_id: self.typeModel,
          office_id: parseInt(self.officeModel),
          age: self.ageModel,
          dt_appearance: self.dtAppearModel.replace("T", " ") + ":00",
        })
      })
        .then((data) => {
          this.getContent();
          this.showPopUp = false;
        });
    },
    updateContent(id) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/" + id, {
        method: 'PUT',
        body: JSON.stringify({
          name: self.nameModel,
          phone: self.phoneModel,
          comments: self.commentModel,
          category_id: self.sourceModel,
          subcategory_id: self.noteModel,
          type_client_id: self.typeModel,
          office_id: parseInt(self.officeModel),
          age: self.ageModel,
          dt_appearance: self.dtAppearModel.replace("T", " "),
        })
      })
        .then((data) => {
          this.getContent();
          this.showEditPopUp = false;
        });
    },
    delContent(id) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/" + id, {
        method: 'DELETE',
      })
        .then((data) => {
          self.getContent();
        });

    },
    getCategories() {
      const alias = "clients_sources";
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/" + alias)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clients_sources = data.results;
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
            if (!data.results[key].category) {
              continue;
            }
            if (self.subcategories[data.results[key].category.id] == undefined) {
              self.subcategories[data.results[key].category.id] = [];
            }
            self.subcategories[data.results[key].category.id].push(data.results[key]);
          }
        })
    },
    getTypes() {
      const alias = "types";
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/" + alias)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clients_types = data.results;
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

.client-incomes {
  height: 200px;
  overflow: auto;
}

.client-income-table th {
  font-size: 8px !important;
}

.client-income-table td {
  font-size: 10px !important;
}

@media screen and (max-width: 450px) {


  .clients-table th:nth-child(1) {
    display: none;
  }

  .clients-table td:nth-child(1) {
    display: none;
  }

  .clients-table th:nth-child(4) {
    display: none;
  }

  .clients-table td:nth-child(4) {
    display: none;
  }
  .clients-table th:nth-child(5) {
    display: none;
  }

  .clients-table td:nth-child(5) {
    display: none;
  }

  .clients-table th:nth-child(6) {
    display: none;
  }

  .clients-table td:nth-child(6) {
    display: none;
  }

  .clients-table th:nth-child(7) {
    display: none;
  }

  .clients-table td:nth-child(7) {
    display: none;
  }

  .clients-table th:nth-child(8) {
    display: none;
  }

  .clients-table td:nth-child(8) {
    display: none;
  }
  .clients-table th:nth-child(10) {
    display: none;
  }

  .clients-table td:nth-child(10) {
    display: none;
  }

}

</style>

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
          <button v-on:click="toggleWin">Добавить</button>
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
        <label>Источник</label>
        <select v-model.trim="sourceModel">
          <option value="" disabled selected>Источник появления</option>
          <option v-for="c in clients_sources" :value="c.id">{{ c.name }}</option>
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
        <label>Возраст</label>
        <input type="text" value="" v-model.trim="ageModel" placeholder="Возраст"/>
      </div>
      <div>
        <label>Оценка</label>
        <input type="text" value="" v-model.trim="noteModel" placeholder="Оценка"/>
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
        <label>Источник</label>
        <select v-model.trim="sourceModel">
          <option value="" disabled selected>Источник появления</option>
          <option v-for="c in clients_sources" :value="c.id">{{ c.name }}</option>
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
        <label>Возраст</label>
        <input type="text" value="" v-model.trim="ageModel" placeholder="Возраст"/>
      </div>
      <div>
        <label>Оценка</label>
        <input type="text" value="" v-model.trim="noteModel" placeholder="Оценка"/>
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
        <span>Оценка:</span><span>{{ noteModel | notEmpty }}</span>
      </div>
      <div class="show-element">
        <span>Откуда:</span><span>{{ sourceName(sourceModel) }}</span>
      </div>
      <div class="show-element">
        <span>Тип:</span><span>{{ typeName(typeModel) }}</span>
      </div>
      <div class="show-element">
        <span>Возраст:</span><span>{{ ageModel | notEmpty }}</span>
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

      showPopUp: false,
      showEditPopUp: false,
      showShowPopUp: false,

      clientsColumns: ["Имя", "Телефон", "Возраст", "Дата Связи", "Откуда", "Тип", "Возраст", "Комментарий", "Оценка",
        "method:Удл.:id:delContent", "method:Ред.:id:editToggleContent", "method:Посм.:id:showToggleContent"],
      incomesColumns: ["Услуга", "Стоимость", "Комментарий", "Дата оказания"],
      methodsList: {},

      clients: [],
      incomes: [],
      clients_sources: [],
      clients_types: [],

      nameModel: "",
      phoneModel: "",
      commentModel: "",
      ageModel: 0,
      dtAppearModel: "",
      sourceModel: 0,
      typeModel: 0,
      noteModel: 5,
      idModel: 0,
    }
  },
  mounted() {
    this.getCategories();
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
      this.ageModel = data["Возраст"];
      this.dtAppearModel = data["Дата Связи"];
      this.sourceModel = data["category_id"];
      this.typeModel = data["type_client"];
      this.noteModel = data["Оценка"];
      this.idModel = id;
    },
    editToggleContent(id) {
      this.fillModels(id);
      this.showEditPopUp = true;
    },
    getContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/")
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
              "Возраст": data.results[key]["age"],
              "Оценка": data.results[key]["note"],
              "id": data.results[key]["id"],
            }
            if (data.results[key]["dt_appearance"]) {
              d["Дата Связи"] = data.results[key]["dt_appearance"].replace("T", " ")
            }
            if (data.results[key]["category"]) {
              d["Откуда"] = data.results[key]["category"]["name"]
              d["category_id"] = data.results[key]["category"]["id"]
            }
            if (data.results[key]["type_client"]) {
              d["Тип"] = data.results[key]["type_client"]["name"]
              d["type_client"] = data.results[key]["type_client"]["id"]
            }
            self.clients.push(d);
          }
        })
    },
    getIncomes() {
      const self = this;
      let url = "/v0/business/incomes/?";
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
              d["Дата оказания"] = data.results[key]["dt_provision"].replace("T", " ")
            }
            if (data.results[key]["client"]) {
              d["Клиент"] = data.results[key]["client"]["name"]
              d["client_id"] = data.results[key]["client"]["id"]
            }

            self.incomes.push(d);
          }
        })
    },
    addContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/", {
        method: 'POST',
        body: JSON.stringify({
          name: self.nameModel,
          phone: self.phoneModel,
          comments: self.commentModel,
          category_id: self.sourceModel,
          type_client_id: self.typeModel,
          age: self.ageModel,
          dt_appearance: self.dtAppearModel.replace("T", " ") + ":00",
          note: self.noteModel,
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
          type_client_id: self.typeModel,
          age: self.ageModel,
          dt_appearance: self.dtAppearModel.replace("T", " "),
          note: self.noteModel,
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


  .clients-table th:nth-child(2) {
    display: none;
  }

  .clients-table td:nth-child(2) {
    display: none;
  }
  .clients-table th:nth-child(3) {
    display: none;
  }

  .clients-table td:nth-child(3) {
    display: none;
  }

  .clients-table th:nth-child(4) {
    display: none;
  }

  .clients-table td:nth-child(4) {
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

  .clients-table th:nth-child(9) {
    display: none;
  }

  .clients-table td:nth-child(9) {
    display: none;
  }

  .clients-table th:nth-child(10) {
    display: none;
  }

  .clients-table td:nth-child(10) {
    display: none;
  }
  .clients-table th:nth-child(11) {
    display: none;
  }

  .clients-table td:nth-child(11) {
    display: none;
  }
}

</style>

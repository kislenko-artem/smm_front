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
        <input type="text" value=""  v-model.trim="nameModel" placeholder="Имя"/>
      </div>
      <div>
        <input type="text" value=""  v-model.trim="phoneModel" placeholder="Телефон"/>
      </div>
      <div>
        <textarea v-model.trim="commentModel" placeholder="Комментарии"></textarea>
      </div>
      <div>
        <select v-model.trim="sourceModel">
          <option  value=""  disabled selected>Источник появления</option>
          <option v-for="c in clients_sources" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <select v-model.trim="typeModel">
          <option  value=""  disabled selected>Тип</option>
          <option v-for="c in clients_types" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <input type="text" value="" v-model.trim="ageModel" placeholder="Возраст"/>
      </div>
      <div>
        <input type="text" value="" v-model.trim="noteModel" placeholder="Оценка"/>
      </div>
      <div>
        <DatePicker format="YYYY-MM-DD H:i:s" width="100%" v-model="dtAppearModel"></DatePicker>
      </div>
      <div class="button-block">
        <button v-on:click="addContent">Добавить</button>
        <button v-on:click="toggleWin">Отмена</button>
      </div>
    </div>

    <div class="pop-up" v-if="showEditPopUp">
      <div>
        <input type="text" value="" v-model.trim="nameModel" placeholder="Имя"/>
      </div>
      <div>
        <input type="text" value="" v-model.trim="phoneModel" placeholder="Телефон"/>
      </div>
      <div>
        <textarea v-model.trim="commentModel" placeholder="Комментарии"></textarea>
      </div>
      <div>
        <select v-model.trim="sourceModel">
          <option  value=""  disabled selected>Источник появления</option>
          <option v-for="c in clients_sources" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <select v-model.trim="typeModel">
          <option  value=""  disabled selected>Тип</option>
          <option v-for="c in clients_types" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <input type="text" value="" v-model.trim="ageModel" placeholder="Возраст"/>
      </div>
      <div>
        <input type="text" value="" v-model.trim="noteModel" placeholder="Оценка"/>
      </div>
      <div>
        <DatePicker format="YYYY-MM-DD H:i:s" width="100%" v-model="dtAppearModel"></DatePicker>
      </div>
      <div class="button-block">
        <button v-on:click="updateContent(idModel)">Сохранить</button>
        <button v-on:click="toggleEditWin">Отмена</button>
      </div>
    </div>

    <div class="pop-up" v-if="showShowPopUp">
      <div class="show-element">
        <span>Имя:</span><span>{{ nameModel }}</span>
      </div>
      <div class="show-element">
        <span>Телефон:</span><span>{{ phoneModel }}</span>
      </div>
      <div class="show-element">
        <span>Комментарий:</span><span>{{ commentModel }}</span>
      </div>
      <div class="show-element">
        <span>Оценка:</span><span>{{ noteModel }}</span>
      </div>
      <div class="show-element">
        <span>Откуда:</span><span>{{ sourceModel }}</span>
      </div>
      <div class="show-element">
        <span>Тип:</span><span>{{ typeModel }}</span>
      </div>
      <div class="show-element">
        <span>Возраст:</span><span>{{ ageModel }}</span>
      </div>
      <div class="show-element">
        <span>Дата появления:</span><span>{{ dtAppearModel }}</span>
      </div>
      <div class="button-block">
        <button v-on:click="toggleEditWin">Редактировать</button>
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

      showPopUp: false,
      showEditPopUp: false,
      showShowPopUp: false,

      clientsColumns: ["Имя", "Телефон", "Возраст", "Дата Связи", "Откуда", "Тип", "Возраст", "Комментарий", "Оценка",
        "method:Удалить:id:delContent", "method:Редактировать:id:editToggleContent", "method:Посмотреть:id:showToggleContent"],
      methodsList: {},

      clients: [],
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
    this.methodsList = {"delContent": this.delContent, "editToggleContent": this.editToggleContent, "showToggleContent": this.showToggleContent};
  },
  methods: {
    toggleWin() {
      this.showPopUp = !this.showPopUp;
    },
    toggleEditWin() {
      this.showShowPopUp = false;
      this.showEditPopUp = !this.showEditPopUp;
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
          dt_appearance: self.dtAppearModel,
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
          dt_appearance: self.dtAppearModel,
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
  background: #ddd;
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
.pop-up textarea {
  width: 100%;
  height: 100px;
  resize: none;
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

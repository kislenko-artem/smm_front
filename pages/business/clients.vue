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
        <input type="text" v-model.trim="searchQuery" placeholder="Фильтр..."/>
        <button v-on:click="toggleWin">Добавить клиента</button>
        <hr/>
        <Grid
          :heroes="clients"
          :columns="clientsColumns"
          :filter-key="searchQuery"
          :methodsList="methodsList"
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
        <input type="text" value="" v-model.trim="ageModel" placeholder="Возраст"/>
      </div>
      <div>
        <input type="text" value="" v-model.trim="noteModel" placeholder="Оценка"/>
      </div>
      <div>
        <DatePicker format="YYYY-MM-DD H:i:s" width="100%" v-model="dtAppearModel"></DatePicker>
      </div>
      <div class="button-block">
        <button v-on:click="addContent">Добавить клиента</button>
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
        <input type="text" value="" v-model.trim="ageModel" placeholder="Возраст"/>
      </div>
      <div>
        <input type="text" value="" v-model.trim="noteModel" placeholder="Оценка"/>
      </div>
      <div>
        <DatePicker format="YYYY-MM-DD H:i:s" width="100%" v-model="dtAppearModel"></DatePicker>
      </div>
      <div class="button-block">
        <button v-on:click="updateContent(idModel)">Редактировать клиента</button>
        <button v-on:click="toggleEditWin">Отмена</button>
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
      clientsColumns: ["Имя", "Телефон", "Возраст", "Дата Связи", "Где Нашел", "Возраст", "Комментарий", "Оценка", "method:Удалить:id:delContent", "method:Редактировать:id:editToggleContent"],
      methodsList: {},

      clients: [],
      clients_sources: [],

      nameModel: "",
      phoneModel: "",
      commentModel: "",
      ageModel: 0,
      dtAppearModel: "",
      sourceModel: 0,
      noteModel: 5,
      idModel: 0,
    }
  },
  mounted() {
    this.getContent();
    this.getCategories();
    this.methodsList = {"delContent": this.delContent, "editToggleContent": this.editToggleContent};
  },
  methods: {
    toggleWin() {
      this.showPopUp = !this.showPopUp;
    },
    toggleEditWin() {
      this.showEditPopUp = !this.showEditPopUp;
    },
    editToggleContent(id) {
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
      this.noteModel = data["Оценка"];
      this.idModel = id;
      // this.sourceModel = data["Имя"];
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
              d["Где Нашел"] = data.results[key]["category"]["name"]
              d["category_id"] = data.results[key]["category"]["id"]
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
  top: 5%;
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

</style>

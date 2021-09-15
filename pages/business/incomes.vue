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
        <input type="text" v-model.trim="searchQuery" placeholder="Фильтр..."/>
        <button v-on:click="toggleWin">Добавить поступление</button>
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
        <select v-model.trim="serviceModel">
          <option  value=""  disabled selected>Источник появления</option>
          <option v-for="c in services" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <select v-model.trim="clientModel">
          <option  value=""  disabled selected>Клиент</option>
          <option v-for="c in clientsSources" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <input type="text" value="" v-model.trim="priceModel" placeholder="Стоимость"/>
      </div>
      <div>
        <input type="text" value="" v-model.trim="durationModel" placeholder="Продолжительность"/>
      </div>
      <div>
        <textarea v-model.trim="commentModel" placeholder="Комментарии"></textarea>
      </div>
      <div>
        <DatePicker format="YYYY-MM-DD H:i:s" width="100%" v-model="dtProvisionModel"></DatePicker>
      </div>
      <div class="button-block">
        <button v-on:click="addContent">Добавить</button>
        <button v-on:click="toggleWin">Отмена</button>
      </div>
    </div>

    <div class="pop-up" v-if="showEditPopUp">
      <div>
        <select v-model.trim="serviceModel">
          <option  value=""  disabled selected>Источник появления</option>
          <option v-for="c in services" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <select v-model.trim="clientModel">
          <option  value=""  disabled selected>Клиент</option>
          <option v-for="c in clientsSources" :value="c.id">{{ c.name }}</option>
        </select>
      </div>
      <div>
        <input type="text" value="" v-model.trim="priceModel" placeholder="Стоимость"/>
      </div>
      <div>
        <input type="text" value="" v-model.trim="durationModel" placeholder="Продолжительность"/>
      </div>
      <div>
        <textarea v-model.trim="commentModel" placeholder="Комментарии"></textarea>
      </div>
      <div>
        <DatePicker format="YYYY-MM-DD H:i:s" width="100%" v-model="dtProvisionModel"></DatePicker>
      </div>
      <div class="button-block">
        <button v-on:click="updateContent(idModel)">Редактировать</button>
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
      clientsColumns: ["Услуга",  "Стоимость", "Комментарий", "Клиент", "Дата оказания", "Продолжительность", "method:Удалить:id:delContent", "method:Редактировать:id:editToggleContent"],
      methodsList: {},

      clients: [],
      clientsSources: [],
      services: [],

      priceModel: "",
      commentModel: "",
      clientModel: 0,
      serviceModel: 0,
      durationModel: 2,
      dtProvisionModel: "",
      idModel: 0,
    }
  },
  mounted() {
    this.getContent();
    this.getServices();
    this.getClients();
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
      this.priceModel = data["Стоимость"];
      this.clientModel = data["client_id"];
      this.serviceModel = data["category_id"];
      this.commentModel = data["Комментарий"];
      this.dtProvisionModel = data["Дата оказания"];
      this.durationModel = data["Продолжительность"];
      this.idModel = id;
      // this.sourceModel = data["Имя"];
      this.showEditPopUp = true;
    },
    getContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/incomes/")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clients = [];
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

            self.clients.push(d);
          }
        })
    },
    addContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/incomes/", {
        method: 'POST',
        body: JSON.stringify({
          price: self.priceModel,
          comments: self.commentModel,
          category_id: parseInt(self.serviceModel),
          client_id: parseInt(self.clientModel),
          dt_provision: self.dtProvisionModel,
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
          client_id: parseInt(self.clientModel),
          dt_provision: self.dtProvisionModel,
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
      fetch(process.env.baseUrl + "/v0/business/clients/")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clientsSources = data.results;
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
  top: 50%;
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

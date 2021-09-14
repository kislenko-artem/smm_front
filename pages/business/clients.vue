<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Управление клиентами</h3>
      </div>
      <article>
        <h4>Список клиентов</h4>
        <ul class="items-list">
          <li v-for="c in clients" v-on:click="delContent(c.id)">{{ c.name }}|{{ c.phone }}|{{ c.comments }}</li>
        </ul>
        <div>
          <input type="text" value="" id="nameModel" v-model.trim="nameModel"/>
          <input type="text" value="" id="phoneModel" v-model.trim="phoneModel"/>
          <input type="text" value="" id="commentModel" v-model.trim="commentModel"/>
          <select v-model.trim="sourceModel">
            <option v-for="c in clients_sources" :value="c.id">{{ c.name }}</option>
          </select>
          <button v-on:click="addContent">Добавить клиента</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'account',
  data: () => {
    return {
      clients: [],
      clients_sources: [],
      nameModel: "",
      phoneModel: "",
      commentModel: "",
      sourceModel: "",
    }
  },
  mounted() {
    this.getContent();
    this.getCategories();
  },
  methods: {
    getContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clients = data.results;
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
          source_id: self.sourceModel
        })
      });
      this.getContent();
    },
    updateContent(id) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/" + id, {
        method: 'PUT',
        body: JSON.stringify({
          name: self.nameModel,
          phone: self.phoneModel,
          comments: self.commentModel,
          source_id: self.sourceModel
        })
      });
      this.getContent();
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

</style>

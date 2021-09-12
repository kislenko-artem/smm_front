<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Управление категориями</h3>
      </div>
      <article>
        <h4>Источники клиентов</h4>
        <ul>
          <li v-for="source in clients_sources" v-on:click="delSource(source.id)">{{ source.name }}</li>
        </ul>
        <div>
          <input type="text" value="" id="sourceModel" v-model.trim="sourceModel"/>
          <button v-on:click="addSource">Добавить источник</button>
        </div>
      </article>
      <article>
        <h4>Услуги</h4>
        <ul>
          <li v-for="service in services" v-on:click="delService(service.id)">{{ service.name }}</li>
        </ul>
        <div>
          <input type="text" value="" id="serviceModel" v-model.trim="serviceModel"/>
          <button v-on:click="addService">Добавить услугу</button>
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
      clients_sources: [],
      services: [],
      sourceModel: "",
      serviceModel: ""
    }
  },
  mounted() {
    this.getCategories("clients_sources", this.clients_sources);
    this.getCategories("services", this.services);
  },
  methods: {
    addSource() {
      this.addCategory("clients_sources", this.clients_sources, this.sourceModel);
    },
    addService() {
      this.addCategory("services", this.services, this.serviceModel);
    },
    delSource(id) {
      this.delCategory("clients_sources", this.clients_sources, id);
    },
    delService(id) {
      this.delCategory("services", this.services, id);
    },
    getCategories(alias, model) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/" + alias)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (model === self.clients_sources) {
            self.clients_sources = data.results;
          }
          if (model === self.services) {
            self.services = data.results;

          }
        })
    },
    addCategory(alias, model, name) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/", {
        method: 'POST',
        body: JSON.stringify({name: name, category_type: alias})
      });
      this.getCategories(alias, model);
    },
    delCategory(alias, model, id) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/" + id, {
        method: 'DELETE',
      })
        .then((data) => {
          self.getCategories(alias, model);
        });

    }
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

</style>

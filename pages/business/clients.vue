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
          <li v-for="source in clients_sources" v-on:click="delContent(source.id)">{{ source.name }}</li>
        </ul>
        <div>
          <input type="text" value="" id="sourceModel" v-model.trim="sourceModel"/>
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
      clients_sources: [],
      sourceModel: "",
    }
  },
  mounted() {
    this.getContent();
  },
  methods: {
    getContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clients_sources = data.results;
        })
    },
    addContent() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/", {
        method: 'POST',
        body: JSON.stringify({name: self.sourceModel})
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

.items-list {
  cursor: pointer;
}

</style>

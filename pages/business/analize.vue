<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Аналитика</h3>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  layout: 'account',
  data: () => {
    return {
      search: "",
      clientsSources: [],
      services: [],
      types: [],
      clients: [],
      operations: [],
    }
  },
  mounted() {
    this.getCategories("clients_sources", this.clientsSources);
    this.getCategories("services", this.services);
    this.getCategories("types", this.types);
    this.getOperations();
    this.getClients();

  },
  methods: {
    getOperations() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/incomes/")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.operations = data.results;
        })
    },
    getClients() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/clients/")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.clients = data.results;
        })
    },
    getCategories(alias, model) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/" + alias)
        .then((response) => {
          return response.json()
        })
        .then((data) => {

          if (model === self.clientsSources) {
            self.clientsSources = [];
            for (let key in data.results) {
              self.clientsSources.push({
                "Название": data.results[key]["name"],
                "id": data.results[key]["id"],
              });
            }
          }

          if (model === self.services) {
            self.services = [];
            for (let key in data.results) {
              self.services.push({
                "Название": data.results[key]["name"],
                "id": data.results[key]["id"],
              });
            }
          }

          if (model === self.types) {
            self.types = [];
            for (let key in data.results) {
              self.types.push({
                "Название": data.results[key]["name"],
                "id": data.results[key]["id"],
              });
            }
          }



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

</style>

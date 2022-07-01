<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Управление категориями</h3>
      </div>
      <div class="categories-main">
        <article>
          <h4>Категории</h4>
          <hr/>
          <div class="manage-data">
            <input type="text" value="" id="serviceModel" v-model.trim="serviceModel"/>
            <button v-on:click="addService">Добавить</button>
          </div>
          <hr/>
          <Grid
            :heroes="services"
            :columns="serviceColumns"
            :filter-key="searchQuery"
            :methodsList="methodsServiceList"
          />
        </article>
        <article>
          <h4>Типы клиентов</h4>
          <hr/>
          <div class="manage-data">
            <input type="text" value="" id="typeModel" v-model.trim="typeModel"/>
            <button v-on:click="addType">Добавить</button>
          </div>
          <hr/>
          <Grid
            :heroes="types"
            :columns="typeColumns"
            :filter-key="searchQuery"
            :methodsList="methodsTypeList"
          />
        </article>
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

      services: [],
      sourceModel: "",
      serviceColumns: ["Название", "method:Удалить:id:delService"],
      methodsServiceList: {},

      types: [],
      typeModel: "",
      typeColumns: ["Название", "method:Удалить:id:delType"],
      methodsTypeList: {},

      serviceModel: "",
    }
  },
  mounted() {
    this.getCategories("services", this.services);
    this.getCategories("types", this.types);
    this.methodsServiceList["delService"] = this.delService;
    this.methodsTypeList["delType"] = this.delType;
  },
  methods: {
    addService() {
      this.addCategory("services", this.services, this.serviceModel);
    },
    addType() {
      this.addCategory("types", this.types, this.typeModel);
    },
    delService(id) {
      this.delCategory("services", this.services, id);
    },
    delType(id) {
      this.delCategory("types", this.types, id);
    },

    getCategories(alias, model) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/" + alias)
        .then((response) => {
          return response.json()
        })
        .then((data) => {

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
    addCategory(alias, model, name) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/categories", {
        method: 'POST',
        body: JSON.stringify({name: name, category_type: alias})
      })
        .then((data) => {
          self.getCategories(alias, model);
        });
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
.categories-main {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.categories-main article{
  width: 50%;
}
.account-content {
  display: flex;
}

.account-right {
  padding: 10px;
}

.items-list {
  cursor: pointer;
}

@media screen and (max-width: 450px) {
  .categories-main article {
    width: 100%;
  }
}

</style>

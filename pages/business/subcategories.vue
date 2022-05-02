<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Управление Подкатегориями</h3>
      </div>
      <div class="categories-main">
        <article>
          <h4></h4>
          <hr/>
          <div class="manage-data">
            <select v-model.trim="categoryIDModel">
              <option value="" disabled selected>Тип</option>
              <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
            </select>
            <input type="text" value=""  v-model.trim="subcategoryNameModel"/>
            <button v-on:click="addSubCategory">Добавить подкатегорию</button>
          </div>
          <hr/>
          <Grid
            :heroes="subcategories"
            :columns="subcategoryColumns"
            :filter-key="searchQuery"
            :methodsList="methodsList"
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

      categories: [],
      subcategories: [],
      categoryIDModel: 0,
      subcategoryNameModel: "",
      subcategoryColumns: ["Категория", "Название", "method:Удалить:id:delSub"],

      methodsList: {},
    }
  },
  mounted() {
    this.getSubCategories();
    this.getCategories();
    this.methodsList["delSub"] = this.delSubCategory;
  },
  methods: {
    getCategories() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/categories/all")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          self.categories = data.results;
        })
    },
    getSubCategories() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/subcategories/list")
        .then((response) => {
          return response.json()
        })
        .then((data) => {


          self.subcategories = [];
          for (let key in data.results) {
            self.subcategories.push({
              "Категория": data.results[key]["category"]["name"],
              "Название": data.results[key]["name"],
              "id": data.results[key]["id"],
            });
          }


        })
    },
    addSubCategory() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/subcategories/add", {
        method: 'POST',
        body: JSON.stringify({name: this.subcategoryNameModel, category_id: this.categoryIDModel})
      })
        .then((data) => {
          self.getSubCategories();
        });
    },
    delSubCategory(id) {
      const self = this;
      fetch(process.env.baseUrl + "/v0/business/subcategories/" + id, {
        method: 'DELETE',
      })
        .then((data) => {
          self.getSubCategories();
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

.categories-main article {
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

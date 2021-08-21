<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Поиск Группп</h3>
      </div>
      <div class="add_group">
        <div>
          <label for="search">Введите поисковый запрос, по которому будут собраны группы сообществ:</label>
        </div>
        <div>
          <input type="text" value="" id="search" v-model.trim="search"/>
          <button v-on:click="startSearch">Выгрузить</button>
        </div>
      </div>

      <table>
        <tr v-for="item in items">
          <td>{{ item.id }}</td>
          <td><a :href = "'https://vk.com/' + item.screen_name" target="_blank">{{ item.name }}</a></td>
          <td><img :src=item.photo_50 /></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'account',
  data: () => {
    return {
      search: "",
      items: []
    }
  },
  methods: {
    startSearch() {
      const self = this;
      fetch('http://server:9999/v0/vk/profiles?q=' + this.search)
        .then((response) => {
            return response.json();
          }
        )
        .then((data) => {
          if (data != undefined && data.results.length == 0) {
            return
          }
          self.items = data.results;
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

<template>
  <div class="account-wrapper">
    <Sidebar />
    <div id="content">
      <div id="content-header">
        <h3>Анализ постов</h3>
      </div>
      <div class="add_group">
        <div>
          <label for="search">ID сообщества, которое хотите проанализировать:</label>
        </div>
        <div>
          <input type="text" value="" id="search" v-model.trim="search"/>
          <button v-on:click="startSearch">Старт</button>
        </div>
      </div>
      <Grid
        :heroes="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery"/>
    </div>
  </div>
</template>


<script>
export default {
  layout: 'account',
  data: () => {
    return {
      search: "",
      searchQuery: "",
      gridColumns: ["ID", "text", "comments", "likes", "reposts", "views", "likes/views", "reposts/views"],
      gridData: []
    }
  },
  methods: {
    startSearch() {
      const self = this;
      fetch(process.env.baseUrl + '/v0/vk/wall/' + this.search)
        .then((response) => {
            return response.json();
          }
        )
        .then((data) => {
          if (data != undefined && data.length == 0) {
            return
          }
          for (let key in data) {
            self.gridData.push({
              "ID": "https://vk.com/" + self.search + "?w=wall" + data[key].from_id +"_" + data[key].id,
              "text": data[key].text,
              "comments": data[key].comments.count,
              "likes": data[key].likes.count,
              "reposts": data[key].reposts.count,
              "views": data[key].views.count,
              "likes/views": Math.round(data[key].likes.count/data[key].views.count*1000)/1000,
              "reposts/views": Math.round(data[key].reposts.count/data[key].views.count*1000)/1000
            })
          }
          self.items = data;
        });
    }

  }
}

</script>


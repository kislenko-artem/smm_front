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
      fetch('http://46.229.212.40:9999/v0/vk/wall/' + this.search)
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
<style>

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

</style>

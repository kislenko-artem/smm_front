<template>
  <div class="account-wrapper">
    <Sidebar/>
    <div id="content">
      <div id="content-header">
        <h3>Поиск аудитории</h3>
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
      <div class="account-charts">
        <div>
          <h3>Возраст участников</h3>
          <table>
            <tr v-for="item in age_data">
              <td>{{ item.name }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </table>
        </div>
        <div>
          <h3>География участников</h3>
          <table>
            <tr v-for="item in geography_data">
              <td>{{ item.name }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </table>
        </div>
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
      age_data: [],
      geography_data: [],
      current_screen: "",
    }
  },
  methods: {
    startSearch() {
      const self = this;
      fetch(process.env.baseUrl + "/v0/vk/stat/groups/" + this.search, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        referrer: "", // или "" для того, чтобы не послать заголовок Referer,
        // или URL с текущего источника
        referrerPolicy: "no-referrer", // no-referrer, origin, same-origin...
        mode: "no-cors", // same-origin, no-cors
        credentials: "same-origin", // omit, include
        cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
        redirect: "follow", // manual, error
        integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
        keepalive: false, // true
        signal: undefined, // AbortController, чтобы прервать запрос
        window: window // null
      }).then((response) => {
        let interval = setInterval(() => {
          fetch(process.env.baseUrl + 'v0/vk/stat/groups/' + this.search + "?age=1")
            .then((response) => {
                return response.json();
              }
            )
            .then((data) => {
              if (data != undefined && data.length == 0) {
                return
              }
              self.age_data = data;
              clearInterval(interval);
            });
        }, 1000)

        let intervalAge = setInterval(() => {
          fetch(process.env.baseUrl + '/v0/vk/stat/groups/' + this.search + "?geography=1")
            .then((response) => {
                return response.json();
              }
            )
            .then((data) => {
              if (data != undefined && data.length == 0) {
                return
              }
              self.geography_data = data;
              clearInterval(intervalAge);
            });
        }, 1000)
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

.account-charts {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

</style>

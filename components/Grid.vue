<template>
  <table>
    <thead>
    <tr>
      <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
        {{ getName(key) }}
        <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
    </span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="entry in filteredHeroes">
      <td v-for="key in columns">
        <span v-html="getValue(entry, key)"></span>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
// register the grid component
export default {
  props: {
    heroes: Array,
    columns: Array,
    methodsList: Object,
    filterKey: String
  },
  data: function () {
    var sortOrders = {};
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: "",
      sortOrders: sortOrders
    };
  },
  computed: {
    filteredHeroes: function () {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var heroes = this.heroes;
      if (filterKey) {
        heroes = heroes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return heroes;
    }
  },
  methods: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    getName(key) {
      if (key.indexOf("method") === 0) {
        let listVal = key.split(":")
        return this.capitalize(listVal[1]);
      }
      return this.capitalize(key);
    },
    getValue(entry, key) {
      if (key.indexOf("method") === 0) {
        let listVal = key.split(":");
        window[listVal[3]] = this.methodsList[listVal[3]];
        return "<button onclick=\"" + listVal[3] + "(" + entry[listVal[2]] +")\">" + this.capitalize(listVal[1]) + "</button>";
      }

      return entry[key];
    },
    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  }
};
</script>
<style>

table {
  border: 1px solid #25313D;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #25313D;
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
  padding: 5px 5px;
  font-size: 12px;
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

<template>
  <div>
    <div id="menu-button" v-on:click="toggleMenu"></div>
    <div class="account-sidebar" :class="{not_active: isActive}">
      <h3>Бизнес: </h3>
      <ul>
        <li>
          <NuxtLink to="/business/categories">Категории</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/business/clients">Клиенты</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/business/incomes">Операции</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/business/analize">Аналитика</NuxtLink>
        </li>
      </ul>
      <h3>Вконтакте: </h3>
      <ul>
        <li>
          <NuxtLink to="/account">Поиск групп</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/account/members">Участники группы</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/account/wall">Активность участников</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isActive: true
    }
  },
  methods: {
    toggleMenu() {
      console.log(this.isActive)
      this.isActive = !this.isActive;
    }
  }

}
</script>

<style>
.not_active {
  display: block;
}
.account-sidebar {
  position: relative;
  box-sizing: border-box;
  width: 200px;
  min-width: 200px;
  padding: 5px 0 1px 0;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: none;
  min-height: 400px;
}

#menu-button {
  display: none;
}

.account-sidebar a {
  cursor: pointer;
  color: #337ab7;
}

.account-sidebar h3 {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #3F454B;
  text-transform: none;
  margin: 0;
  padding: 10px 20px 10px 24px;
}

.account-sidebar ul {
  list-style-type: none;
  padding: 0 0 0 24px;
}

.account-sidebar ul a {
  text-decoration: none;
  color: #457ea4;
}

.account-sidebar ul a:hover {
  color: #3F454B;
}

.account-sidebar ul li.active a {
  color: #3F454B;
}

@media screen and (max-width: 980px) {
  .account-sidebar {
    position: absolute;
    height: 100%;
  }

  #menu-button {
    display: block;
    position: absolute;
    margin: -40px 0 0 5px;
    width: 30px;
    height: 30px;
    border: 1px solid white;
    cursor: pointer;
  }

  .not_active {
    display: none;
  }
}
</style>

<template>
  <div class="account-sidebar">
    <h3>Выберите: </h3>
    <ul>
      <li>
        <NuxtLink to="/account">Поиск аудитории</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/account/members">Участники группы</NuxtLink>
      </li>
      <!--            <li class="members">-->
      <!--                <a href="">Участники группы</a>-->
      <!--            </li>-->
      <!--            <li>-->
      <!--                <a href="">География подписчиков</a>-->
      <!--            </li>-->
      <!--            <li>-->
      <!--                <a href="">Активность участников</a>-->
      <!--            </li>-->
      <!--            <li>-->
      <!--                <a href="">Пересечение групп</a>-->
      <!--            </li>-->
      <!--            <li>-->
      <!--                <a href="">Стена группы</a>-->
      <!--            </li>-->
    </ul>
  </div>
</template>

<style>
.account-sidebar {
  position: relative;
  box-sizing: border-box;
  width: 15%;
  min-width: 200px;
  padding: 5px 0 1px 0;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: none;
  min-height: 200px;

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
</style>

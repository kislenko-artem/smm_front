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
      items: []
    }
  },
  methods: {  }
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

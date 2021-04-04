<template>
    <div class="account-wrapper">
        <Sidebar/>
        <div id="content">
            <div id="content-header">
                <h3>Поиск аудитории</h3>
            </div>
            <div class="add_group">
                <div>
                    <label for="search">Введите поисковый запрос, по которому будут собраны участники сообществ:</label>
                </div>
                <div>
                    <input type="text" value= "" id="search"/>
                    <button>Выгрузить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'account',
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
<template>
    <div class="main">
        <div class='header'>
            <div class='header-top'>
                <div class="header-logo">
                    <span></span>
                </div>
                <div class="account">
                    <div>
                        <NuxtLink to="/account" class="login-link">Кабинет</NuxtLink>
                        <a href="javascript:void(0);" class="login-link">Выход</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-content">
            <Nuxt/>
        </div>
        <div class='footer'></div>
    </div>
</template>

<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
    }
    hr {
      margin: 10px 0 10px 0;
    }

    h4 {
      margin-top: 20px;
    }

    .main {
      min-width: 310px;
    }

    .header {
        width: 100%;
        height: auto;
        background: #25313d;
        color: #fff;
    }

    .header-top {
        height: 46px;
        width: 1000px;
        margin: 0 auto;
        position: relative;
    }

    .header-top .header-logo {
        width: 200px;
        height: 50px;
        margin: 12px 0;
        position: absolute;
    }

    .header-top .header-logo .logo {
        height: 30px;
        margin: 16px 0;
    }

    .header-top .header-logo > span {
        text-transform: uppercase;
        display: block;
        position: absolute;
        color: #fff;
    }

    .header-top .account {
        margin: 12px 0 0 0;
        position: absolute;
        right: 0;

    }

    .login-link {
        color: white;
        padding: 10px 10px 0 0;
    }

    .footer {
        margin: 10px auto;
        height: 62px;
        width: 100%;
        border-bottom: 2px solid #000;
        background: #363e47;
        background: -moz-linear-gradient(top, #363e47 0, #444b54 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #363e47), color-stop(100%, #444b54));
        background: -webkit-linear-gradient(top, #363e47 0, #444b54 100%);
        background: -o-linear-gradient(top, #363e47 0, #444b54 100%);
        background: -ms-linear-gradient(top, #363e47 0, #444b54 100%);
        background: linear-gradient(to bottom, #363e47 0, #444b54 100%);

    }

    body {
        background: #f7f7f7;
    }

    .account-header {
        height: 55px;
        width: 100%;
        text-align: center;
    }

    .account-header h3 {
        font-size: 16px;
    }

    .account-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    #content {
        min-height: 400px;
        padding: 37px 10px 20px 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        background: #fff;
        width: 80%;
    }

    #content-header {
        display: flex;
        margin: -27px 0 20px 0;
        justify-content: space-between;
    }

    #content-header .update-icon {
        cursor: pointer;
    }

    #content .account-day-weeks {
        display: flex;
        list-style-type: none;
        justify-content: space-around;
    }

    #content .account-day-weeks a {
        text-decoration: none;
    }

    #content .account-day-weeks a.active {
        color: #235270;
    }

    #content .center-pie {
        width: 410px;
        margin: 0 auto;
    }

    #content .recharts-legend-wrapper {
        margin: 0 -50px 0 0;
    }

    #content h3 .new_members {
        text-align: center;
    }

    #content button:hover {
        background: #3cb0fd;
        background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
        background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
        background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
        background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
        background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
    }


    #content button {
        background: #2d79f3;
        -webkit-border-radius: 9px;
        -moz-border-radius: 9px;
        border-radius: 9px;
        color: #fff;
        font-size: 12px;
        padding: 6px 10px 6px 10px;
        text-decoration: none;
        border: none;
        outline: none;
        margin: 0 0 0 24px;
        cursor: pointer;
    }

    #content .add_group {
        padding: 10px 20px 10px 24px;
    }

    #content .add_group input:hover {
        outline: none;

    }

    #content .add_group input {
        font-family: Helvetica, Arial, sans-serif;
        padding: 0 10px;
        height: 30px;
        border: 1px solid #ccc;
        line-height: 28px;
        font-size: 11px;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        outline: none;
        width: 113px;
    }

    #content .add_group button {
        margin: 0 0 0 4px;
    }

    #content .add_group div {
        padding-bottom: 10px;
    }

    @media screen and (max-width: 980px) {
      .account-sidebar {
        position: absolute;
        height: 100%;
      }

      #content {
        width: 100%;
      }
    }

</style>

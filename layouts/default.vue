<template>
  <div class="main">
    <div class='header'>
      <div class='header-top'>
        <div class="header-logo">
          <span>vk-помощник</span>
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
      <div class="slider">
        <img src="/img/slider.jpg" class="slider-image"/>
        <div class="slider-hint">
          <div class="hint-title">Ваш новый уровень</div>
          <div class="hint-text">Анализируй свои возможности</div>
        </div>
      </div>
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

  .slider-hint {
    position: absolute;
    width: 400px;
    left: 50%;
    margin: 0 0 0 -200px;
    top: 15%;
    color: #fff;
    text-align: center;
  }

  .hint-title {
    font-size: 24px;
    line-height: 1.2;
    font-family: "Arvo", "Times New Roman", Times, serif;
    position: relative;
  }

  .hint-title:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    height: 2px;
    width: 36px;
    background: #cfaa45;
    transform: translate(-125%, -50%);
  }

  .hint-title:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    height: 2px;
    width: 36px;
    background: #cfaa45;
    transform: translate(25%, -50%);
  }

  .hint-text {
    font-size: 30px;
    line-height: 1.2;
    font-family: "Arvo", "Times New Roman", Times, serif;
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

</style>

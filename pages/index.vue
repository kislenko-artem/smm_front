<template>
    <div class="main">
        <div class='header'>
            <div class='header-top'>
                <div class="header-logo">
                    <span>vk-помощник</span>
                </div>
                <div class="account">
                    <div>
                        <a href="#/account" class="login-link">Кабинет</a>
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
            <div class="services">
                <h2>Наши услуги</h2>
                <div class="list">
                    <article class="service">
                        <div class="icon"><i class="fa fa-bar-chart" aria-hidden="true"></i></div>
                        <h3>Мониторинг активности</h3>
                        <div class="description">Следит за тем когда человек появляется в сети. Поможет узнать время
                            вашей
                            аудитории
                        </div>
                    </article>
                    <article class="service">
                        <div class="icon"><i class="fa fa-address-book-o" aria-hidden="true"></i></div>
                        <h3>Мониторинг участников</h3>
                        <div class="description">Покажет кто добавился или удалился из участников группы</div>
                    </article>
                    <article class="service">
                        <div class="icon"><i class="fa fa-globe" aria-hidden="true"></i></div>
                        <h3>География подписчиков</h3>
                        <div class="description">Проможет в продвижении региональных групп</div>
                    </article>
                    <article class="service">
                        <div class="icon"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
                        <h3>Пересечение участников</h3>
                        <div class="description">Поможет найти аудиторию для вашей группы.</div>
                    </article>
                </div>
            </div>
            <div class="services">
                <h2>Примеры интерфеса</h2>
                <!--<Gallery photos={PHOTO_SET} />-->
            </div>
        </div>
        <div class='footer'></div>
    </div>
</template>

<script>
    export default {}
</script>

<style>
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

    .header-to .header-logo {
        width: 200px;
        height: 50px;
        margin: 12px 0;
        position: absolute;
    }

    .header-to .header-logo .logo {
        height: 30px;
        margin: 16px 0;
    }

    .header-to .header-logo > span {
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

    .main-content {

    }

    .main-content .slider {
        margin: 0 auto;
        height: 200px;
        overflow: hidden;
        position: relative;
    }

    .main-content .slider-image {
        width: 100%;
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

    .services h2 {
        line-height: 1.2;
        font-size: 40px;
        margin: 30px auto;
        text-align: center;
        font-family: "Arvo", "Times New Roman", Times, serif;
        font-weight: 700;
        color: #25313d;
    }

    .services h3 {
        line-height: 1.11111;
        font-size: 14px;
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
        font-weight: 700;
        text-align: center;
    }

    .services .list {
        display: flex;
        padding: 0 0 30px 0;
    }

    .services .description {
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
        font-family: "Open Sans", Helvetica, Arial, sans-serif;
        font-weight: 400;
        -webkit-font-smoothing: subpixel-antialiased;
        text-rendering: optimizeLegibility;
    }

    .services .service {
        max-width: 308px;
        padding: 67px 40px 61px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #666;
    }

    .services .icon {
        text-align: center;
    }

    .services i.fa {
        font-size: 25px;
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

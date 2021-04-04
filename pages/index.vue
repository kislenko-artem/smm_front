<template>
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
</template>

<script>
    export default {}
</script>

<style>

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
</style>

<template>


  <div id="app">
    <body>
    <div id="loader" class="text-center" style="display:table-cell;vertical-align:middle;width:100vw;height:100vh;background:#333;color:#e3f2fd;position: relative; z-index: 10000;">
      <div class="spinner-grow" style="width: 10rem; height: 10rem;" role="status"><span class="sr-only">Loading...</span></div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm" id="menu-header" role="tablist" style="background-color: #e3f2fd;">
      <a class="navbar-brand" href="#Столовая/Комплекс">
        <img src="imgs/logo.png" width="50" height="50" class="d-inline-block align-center" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active mr-3" data-menuanchor="РУЗ">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              РУЗ
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin-left: 2vw;">
              <a class="dropdown-item h2" href="#РУЗ/Расписание">Расписание</a>
              <a class="dropdown-item h2" href="#РУЗ/Аудитории">Аудитории</a>
            </div>
          </li>
          <li class="nav-item mr-3" data-menuanchor="Столовая">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Столовая
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin-left: 10vw;">
              <a class="dropdown-item h2" href="#Столовая/Комплекс">Комплексный обед</a>
              <a class="dropdown-item h2" href="#Столовая/Меню">Меню</a>
            </div>
          </li>
          <li class="nav-item mr-3" data-menuanchor="Навигация">
            <a class="nav-link" href="#Навигация">Навигация</a>
          </li>
          <li class="nav-item mr-3" data-menuanchor="Новости">
            <a class="nav-link" href="#Новости">Новости</a>
          </li>
        </ul>
      </div>
    </nav>
    <div id="myContainer">
      <div class="section" id="section0">
        <div class="slide" id="slide" data-anchor="Расписание">
          <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups" style="margin-top: 1em;">
            <div class="input-group autocomplete-wrapper col-md-4 mt-3 mr-3">
              <input id="ruz-search" type="text" class="form-control form-control-lg" placeholder="Поиск..." aria-label="Input group example" aria-describedby="btnGroupAddon">
              <div class="input-group-append">
                <span class="input-group-text text-muted" id="ruz-search-icon"><i class="fa fa-times"></i></span>
              </div>
              <div id="search-advice-wrapper"><table></table></div>
            </div>
            <div class="input-group input-date mt-3 mr-3" style='margin-left: 100px;'>
              <input id="ruz-datepicker" class="form-control form-control-lg">
            </div>
            <div class="input-group mt-2 mr-2" style='margin-left: 200px;'>
              <div class="btn-group week-changer">
                <button id="prev-week-btn" class="btn btn-outline-secondary btn-lg" type="button" title="Предыдущая неделя">
                  <i class="fa fa-arrow-left"></i>
                </button>
                <button id="next-week-btn" class="btn btn-outline-secondary btn-lg" type="button" title="Следующая неделя">
                  <i class="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <!-- <button id="reset-btn" class="btn btn-outline-danger clear-filter mt-3 mr-3" type="button">
              <i class="fa fa-times fa-fw"></i>
            </button> -->
          </div>
          <div class="list" id="ruz-content"></div>
        </div>
        <div class="ruz-keyboard"></div>
        <div class="slide" id="slide22" data-anchor="Аудитории">
          <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
						<span class="col-3" id="amount" style="line-height: 38px; font-size: 17pt;">Интервал:
							<span id="lesson-num"></span>
							<span id="lesson-count"></span>
							<span id="lesson-time"></span>
							<span id="lesson-load" style="display: none;"><i class='fa fa-spinner fa-pulse fa-fw'></i></span>
						</span>
            <div class="m-auto col-3">
              <div id="slider-range"></div>
            </div>
            <div class="input-group input-date m-auto">
              <input id="classrooms-datepicker" class="form-control form-control-lg">
            </div>
            <div class="input-group m-auto">
              <div class="btn-group week-changer">
                <button id="prev-day-btn" class="btn btn-outline-secondary btn-lg" type="button" title="Предыдущий день">
                  <i class="fa fa-arrow-left"></i>
                </button>
                <button id="next-day-btn" class="btn btn-outline-secondary btn-lg" type="button" title="Следующий день">
                  <i class="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <button id="classrooms-clear" class="btn btn-outline-danger clear-filter m-auto btn-lg" type="button">
              <i class="fa fa-times fa-fw"></i>
            </button>
          </div>
          <div class="col-sm-11" id="free-classes-ruz">

          </div>
        </div>
      </div>
      <div class="section" id="section1">
        <div class="slide" id="slide1" data-anchor="Комплекс">
          <div id="complex-list">
            <!-- <h2 class="text-uppercase text-center">Комплексный обед - 120 рублей</h2>
            <h3 class="mb-3 text-center">С 11:30 до 16:00</h3>
            <ul class="list-group col-md-4 m-auto">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Салат из свежей капусты "Витаминный"
                <span class="badge badge-dark badge-pill">100</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Суп гороховый
                <span class="badge badge-dark badge-pill">300</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Паста "Болоньезе"
                <span class="badge badge-dark badge-pill">150/75</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Компот из свежих фруктов
                <span class="badge badge-dark badge-pill">200</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Хлеб ржаной<br>
                Хлеб пшеничный
                <span class="badge badge-dark badge-pill">1+2</span>
              </li>
            </ul> -->
          </div>
        </div>
        <div class="slide" id="slide2" data-anchor="Меню">
          <div id="menu-table"></div>
        </div>
      </div>
      <div class="section" id="section2">
        <div class="map">
          <object id="svgObj0" class="floor" data="navigation/floor0.svg" type="image/svg+xml"></object>
          <object id="svgObj1" class="floor" data="navigation/floor1.svg" type="image/svg+xml"></object>
          <object id="svgObj2" class="floor" data="navigation/floor2.svg" type="image/svg+xml"></object>
          <object id="svgObj3" class="floor" data="navigation/floor3.svg" type="image/svg+xml"></object>
          <object id="svgObj4" class="floor" data="navigation/floor4.svg" type="image/svg+xml"></object>
          <object id="svgObj5" class="floor" data="navigation/floor5.svg" type="image/svg+xml"></object>
          <object id="svgObj6" class="floor" data="navigation/floor6.svg" type="image/svg+xml"></object>
          <object id="svgObj2a" class="floor" data="navigation/floor2a.svg" type="image/svg+xml"></object>
          <object id="svgObj3a" class="floor" data="navigation/floor3a.svg" type="image/svg+xml"></object>
          <object id="svgObj4a" class="floor" data="navigation/floor4a.svg" type="image/svg+xml"></object>
          <object id="svgObj5a" class="floor" data="navigation/floor5a.svg" type="image/svg+xml"></object>
          <object id="svgObj6a" class="floor" data="navigation/floor6a.svg" type="image/svg+xml"></object>
          <object id="svgObj7a" class="floor" data="navigation/floor7a.svg" type="image/svg+xml"></object>
          <object id="svgObj8a" class="floor" data="navigation/floor8a.svg" type="image/svg+xml"></object>
          <object id="svgObj9a" class="floor" data="navigation/floor9a.svg" type="image/svg+xml"></object>
          <div class="cab-search">
            <div id="cab-search-form">
              <input type="text" id="cab-num" placeholder="Что вы ищете?" readonly>
              <button id="cab-keyboard-open"><i class="mdi mdi-keyboard"></i></button>
            </div>
            <div class="nav-keyboard"></div>
          </div>
          <div class="floor-change">
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div class="btn-group-vertical btn-group-toggle mr-2" role="group" aria-label="First group">
                <input type="button" value="9a" class="btn btn-secondary floor-num btn-lg">
                <input type="button" value="8a" class="btn btn-secondary floor-num btn-lg">
                <input type="button" value="7a" class="btn btn-secondary floor-num btn-lg">
                <div class="btn-group" role="group"><input type="button" value="6" class="btn btn-secondary floor-num btn-lg"><input type="button" value="6a" class="btn btn-secondary floor-num btn-lg"></div>
                <div class="btn-group" role="group"><input type="button" value="5" class="btn btn-secondary floor-num btn-lg"><input type="button" value="5a" class="btn btn-secondary floor-num btn-lg"></div>
                <div class="btn-group" role="group"><input type="button" value="4" class="btn btn-secondary floor-num btn-lg"><input type="button" value="4a" class="btn btn-secondary floor-num btn-lg"></div>
                <div class="btn-group" role="group"><input type="button" value="3" class="btn btn-secondary floor-num btn-lg"><input type="button" value="3a" class="btn btn-secondary floor-num btn-lg"></div>
                <div class="btn-group" role="group"><input type="button" value="2" class="btn btn-secondary floor-num btn-lg"><input type="button" value="2a" class="btn btn-secondary floor-num btn-lg"></div>
                <input type="button" value="1" class="btn btn-secondary floor-num btn-lg">
                <input type="button" value="0" class="btn btn-secondary floor-num btn-lg">
              </div>
            </div>
          </div>
          <button type="button" id="here-btn" class="btn btn-outline-dark btn-lg">Домой <i class="mdi mdi-map-marker"></i></button>
          <button type="button" id="stop-animation" class="btn btn-outline-dark btn-lg">Остановить</button>
        </div>
      </div>
      <!-- <div class="section" id="section3">
        <div id="onlynews" class="slider" data-anchor="Новости"></div>
      </div> -->

      <div class="section" id="section3">
        <div id="news-slider-bg"></div>
        <div id="news-slides"></div>
      </div>
    </div>

    <div id="sleep_menu">
      <div id="sleep_check"></div>
      <div class="info-menu">
        <div class="top-menu shadow">
          <div class="top-left-menu">
            <div id="time"><span id="time-node"></span> <i class="far fa-clock"></i> </div>
          </div>
          <div class="top-menu-content"><h2><i class="mdi mdi-gesture-tap h1"></i> чтобы начать работу</h2></div>
        </div>
        <div class="left-menu shadow">
          <div class="free-class-title">Свободные аудитории на 3 пару (12:10-13:30)</div>
          <ul class="free-classes" id="free-classes-sm">
            <li class="floar">
              <h6>1 ЭТАЖ</h6>
              <p>107 <small>(30)</small>, 121 <small>(16)</small></p>
            </li>
            <li class="floar">
              <h6>2 ЭТАЖ</h6>
              <p>208 <small>(50)</small>, 209 <small>(16)</small>, 212 <small>(16)</small>, 213 <small>(27)</small>, 228а <small>(16)</small>, 233а <small>(16)</small></p>
            </li>
            <li class="floar">
              <h6>3 ЭТАЖ</h6>
              <p>302 <small>(32)</small>, 309 <small>(16)</small>, 311 <small>(18)</small>, 313 <small>(28)</small></p>
            </li>
            <li class="floar">
              <h6>4 ЭТАЖ</h6>
              <p>409 <small>(12)</small>, 410 <small>(150)</small>, 411 <small>(16)</small>, 412 <small>(148)</small>, 413 <small>(100)</small>, 414 <small>(14)</small>, 424 <small>(32)</small>, 425 <small>(10)</small>, 427 <small>(12)</small>, 435 <small>(10)</small></p>
            </li>
            <li class="floar">
              <h6>5 ЭТАЖ</h6>
              <p>506 <small>(200)</small>, 512 <small>(12)</small>, 515 <small>(18)</small>, 520 <small>(18)</small>, 522 <small>(20)</small></p>
            </li>
            <li class="floar">
              <h6>6 ЭТАЖ</h6>
              <p>606 <small>(20)</small></p>
            </li>
            <li class="floar">
              <h6>7 ЭТАЖ</h6>
              <p>703 <small>(12)</small></p>
            </li>
            <li class="floar">
              <h6>8 ЭТАЖ</h6>
              <p>802 <small>(30)</small>, 807 <small>(10)</small>, 808 <small>(10)</small></p>
            </li>
            <li class="floar">
              <h6>9 ЭТАЖ</h6>
              <p>904 <small>(0)</small></p>
            </li>
          </ul>
        </div>
      </div>
      <div id="news" class="slider">
        <!-- <div class="sleep_slide current">
          <img class="sleep_slide_img" src="https://uploadrb.ru/upload/admins/picture/1237/a66da85f0a06492840a82310fd1d7554.jpg">
          <div class="sleep_slide_content">
            <h2>Скоро в МИЭМе будут работать сенсорные моноблоки</h2>
            <p>Группа студентов в рамках проекта разработала программное обеспечение на базе сенсорных моноблоков</p>
          </div>
          <div id="qrcode1" class="qrcode"></div>
        </div>
        <div class="sleep_slide">
          <img class="sleep_slide_img" src="https://miem.hse.ru/data/2019/11/20/1519786384/3jeQAigYZz18.jpg">
          <div class="sleep_slide_content">
            <h2>Студентки МИЭМ придумали «умное МРТ-одеяло»</h2>
            <p>Разработка была представлена в Научно-технологическом университете «Сириус» в Сочи и заняла первое место на хакатоне по современным проблемам физической науки и индустрии</p>
          </div>
          <div id="qrcode2" class="qrcode"></div>
        </div>
        <div class="sleep_slide">
          <img class="sleep_slide_img" src="https://miem.hse.ru/data/2018/11/23/1141525253/IMG_0310%20(1).jpg">
          <div class="sleep_slide_content">
            <h2>Второй этап представления проектов 2019/2020 уч. года</h2>
            <p>25-29 ноября 2019 года – второй этап представления проектов 2019/2020 уч. года</p>
          </div>
          <div id="qrcode3" class="qrcode"></div>
        </div> -->
      </div>
    </div>


    </body>

  </div>

</template>
//import $ from 'jquery'
<script>

//import './script.js'
//import './js/menu'
//import './js/sleep-menu'
//import './js/ruz'
//import './js/news'
//import './navigation/navigation'
export default {
  name: 'App',
  components: {

  },

}
</script>


<style lang="scss">
//@import './styles/sleep-menu.css';
//@import './styles/styleNews.css';
//@import './styles/styleRuz.css';
//@import './styles/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


// eslint-disable-next-line no-undef
 $(document).ready(function(){
    //$(window).on( "load", function() {	
     // eslint-disable-next-line no-undef
    new fullpage('#myContainer', {
    //Навигация
    menu: '#menu-header',
    lockAnchors: false,
    anchors:['РУЗ', 'Столовая', 'Навигация', 'Новости'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Расписание', 'Столовая', 'Навигация', 'Новости'],
    showActiveTooltip: true,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',

    //Скроллинг
    css3: true,
    scrollingSpeed: 900,
    fitToSection: true,
    fitToSectionDelay: 1000,
    scrollBar: false,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: false,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: true,
    offsetSections: false,
    resetSliders: true,
    fadingEffect: false,
    normalScrollElements: '',
    scrollOverflow: true,
    scrollOverflowReset: true,
    scrollOverflowOptions: {
    scrollbars: true,
    fadeScrollbars: true
},
    touchSensitivity: 1000,
    bigSectionsDestination: null,

    //Доступ
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    //Дизайн
    controlArrows: false,
    verticalCentered: true,
    sectionsColor: ['#FFF', '#FFF', '#FFF', '#FFF'],
    //paddingTop: '3em',
    paddingBottom: '60px',
    fixedElements: '#header, .footer',
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,
    parallax: false,
    parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
    cards: false,
    cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

    //Настроить селекторы
    sectionSelector: '.section',
    slideSelector: '.slide',

    lazyLoading: false,

    //события
    onLeave: function(origin, destination, direction){},
    afterLoad: function(origin, destination, direction){},
    afterRender: function(){},
    afterResize: function(width, height){},
    afterReBuild: function(){},
    afterResponsive: function(isResponsive){},
    afterSlideLoad: function(section, origin, destination, direction){},
    onSlideLeave: function(section, origin, destination, direction){}
});
    $("#loader").detach();
})
let log =log.console("Подключено!");


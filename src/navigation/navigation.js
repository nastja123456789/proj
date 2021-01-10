//var g = new gr.Graph();
//g.vertices = JSON.parse(fs.readFileSync('./config.json')).graph.vertices;

var g = new graph.Graph();
g.vertices = graph.graphjson.vertices;

var keyboard;

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "slideDown",
    "hideMethod": "fadeOut"
}


const cabFloorMatch = {
    "1":  ["101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "121", "123", "124", "125", "134"],
    "2":  ["201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "220", "222", "223", "224"],
    "2a": ["225", "226", "228", "232", "233", "234"],
    "3":  ["301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "321", "322", "323", "324", "325"],
    "3a": ["326", "327", "328", "329", "330", "334", "335", "336", "337", "338"],
    "4":  ["401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "420", "421", "422", "423", "424"],
    "4a": ["425", "426", "427", "428", "429", "433", "434", "435"],
    "5":  ["501", "502", "503", "504", "505", "506", "408", "410", "412", "413"],
    "5a": ["512", "513", "514", "515", "519", "520", "521", "522"],
    "6":  ["501", "504", "506"],
    "6a": ["606", "607", "608", "612", "613", "614"],
    "7a": ["703", "704", "705", "706", "707", "708", "712", "713", "714"],
    "8a": ["801", "802", "803", "807", "808", "809", "810"],
    "9a": ["901", "902", "903", "904", "905", "909", "910", "911", "912"]
};


const easingBezier = 'cubicBezier(0.250, 0.100, 0.250, 1.000)';

$(document).click(function (e){ // событие клика по веб-документу
    let navkey = $(".nav-keyboard"); // тут указываем ID элемента
    if (!navkey.is(e.target) // если клик был не по нашему блоку
        && navkey.has(e.target).length === 0 && !$(".cab-search").is(e.target) && $(".cab-search").has(e.target).length === 0) { // и не по его дочерним элементам
        navkey.hide(); // скрываем его
        $("#cab-num").val("");
        keyboard.setInput("");
        clearPath();
    }
});

function changeHomeDot(hd){
    homeFloor = getFloorByElementName(hd);
    $('.floor-num').removeClass("active");
    $(`.floor-num[value="${homeFloor}"]`).addClass("active");
    for (let x in svgDocs)
        $(svgDocs[x]).find("#here").css("visibility", "hidden");

    let cf = $(svgDocs[homeFloor]);
    cf.find("#here").css("visibility", "visible");
    let cd = cf.find(`#${hd}`);
    let h = $(cf.find("#here"));

    let hereX = cd.attr("cx");
    let hereY = cf.find("svg").attr("height") - cd.attr("cy");
    h.attr("transform", `translate(${hereX}, ${-hereY})`);

    CURRFLOOR = homeFloor;

    $('.floor').css("visibility", "hidden");
    $(`#svgObj${homeFloor}`).css("visibility", "visible");
}

function getFloorByElementName(elName){
    if (elName.indexOf("cab") !=-1 ){
        var tmplst = []
        for (let f in cabFloorMatch){
            if (cabFloorMatch[f].indexOf(elName.substring(3, 10).replace('a', '').split(' ')[0]) != -1){
                tmplst.push(f);
            }
        }
        if (tmplst.length == 1 || tmplst[0] == TARGETFLOOR) return tmplst[0];
        else if (tmplst[1] == TARGETFLOOR) return tmplst[1];
    }

    let to;
    if (elName.length == 4 || (elName.indexOf("cab")!=-1 && elName.length == 6))
        to = 4;
    else if(elName.length == 5 || (elName.indexOf("cab")!=-1 && elName.length == 7))
        to = 5;
    else to = elName.indexOf('-');
    return elName.substring(3,to);
}

function drawPath(){
    for(let i = 0; i < path.length-2; i++){
        let elem_index = getFloorByElementName(path[i]);
        let end_index = getFloorByElementName(path[i+1]);
        let elem = svgDocs[elem_index].getElementById(`${path[i]}`);
        let end = svgDocs[end_index].getElementById(`${path[i+1]}`);
        if (path[i][0] == 'd'){
            $(elem).attr("ox", $(elem).attr("cx"));
            $(elem).attr("oy", $(elem).attr("cy"));

            if (i == 0 || path[i-1][0] != 'd'){
                //выхлопавание
                $(elem).attr("r", "0");
                dotMove(elem, 10);
            }
            else if ((i == path.length-3 || path[i+2][0] != 'd') && path[i][3] == path[i+2][3]){
                //схлопывание
                dotMove(elem, 0);
            }
            else if (path[i+1][0] != 's' && path[i+1][0] != 'l'){
                dotMove(elem);
            }
            function dotMove(dot,rad){
                $(elem).css("opacity", "1.0");
                let x =  parseInt($(end).attr("cx"));
                let y = parseInt($(end).attr("cy"));

                anime({
                    targets: dot,
                    duration: 750,
                    cx: x,
                    cy: y,
                    loop: true,
                    easing: 'linear',
                    r: rad
                });
            }
        }

        else{
            animeStart(elem, svgDocs[getFloorByElementName(path[i])]);
        }
    }

    let elem1 = svgDocs[getFloorByElementName(path[path.length-1])].getElementById(`${path[path.length-1]}`);
    animeStart(elem1, svgDocs[getFloorByElementName(path[path.length-1])]);

    /* if (path[path.length-2][0] != 'd'){
        let elem2 = svgDocs[path[path.length-2].substring(3, path[i].indexOf('-'))].getElementById(`${path[path.length-2]}`);
        animeStart(elem2, svgDocs[getFloorByElementName(path[i])]);
    } */
    let from = getFloorByElementName(path[0]);
    let to = getFloorByElementName(path[path.length-1]);
    circleNavAnimate(from, to);
}

function clearPath(){
    for(let x of path){
        anime.remove(svgDocs[getFloorByElementName(x)].querySelector("feGaussianBlur"));
        anime.remove(svgDocs[getFloorByElementName(x)].querySelector("feOffset"));
        let elem = svgDocs[getFloorByElementName(x)].getElementById(`${x}`);
        if (x[0] == 'd'){
            $(elem).css("opacity", "0");
            anime.remove(elem);
            $(elem).attr("cx", $(elem).attr("ox"));
            $(elem).attr("cy", $(elem).attr("oy"));
            $(elem).attr("r", "10");
        }else{
            anime.remove(elem);
            $(elem).removeAttr("style");
        }
    }

    clearInterval(floorChangeInterval);
    $(".floor-change").fadeIn();
    $(".cab-search").fadeIn();
    $("#fp-nav").fadeIn();
    $("#here-btn").fadeIn();
    $("#menu-header").slideDown();
    $("#stop-animation").fadeOut();
    //$("#toast-container>*").remove();
    //toastr.clear();
}

function animeStart(elem_name, floor_name){
    $(elem_name).css("filter", "url(#dropShadow)")
    anime.timeline({
        direction: 'alternate',
        loop: true,
        easing: easingBezier
    })
        .add({
            targets: elem_name,
            translateX: [0,-10],
            translateY: [0,-10]
        }, 0)
        .add({
            targets: floor_name.querySelector("feGaussianBlur"),
            stdDeviation: [0,3]
        }, 0)
        .add({
            targets: floor_name.querySelector("feOffset"),
            dx: [0,10],
            dy: [0,10]
        }, 0);
}

function markPath(cab_name, floor_name){
    $(cab_name).css("filter", "url(#dropShadow)");
    path = [cab_name.id];
    anime.timeline({
        duration: 700,
        loop: false,
        easing: easingBezier
    })
        .add({
            targets: cab_name,
            translateX: [0,-10],
            translateY: [0,-10]
        }, 0)
        .add({
            targets: floor_name.querySelector("feGaussianBlur"),
            stdDeviation: [0,3]
        }, 0)
        .add({
            targets: floor_name.querySelector("feOffset"),
            dx: [0,8],
            dy: [0,8]
        }, 0)
        .finished.then( function(){});
}

var floorChangeInterval;
function circleNavAnimate(from, to){
    if (from == to){
        $(".floor-change").fadeOut();
        $(".cab-search").fadeOut();
        $("#fp-nav").fadeOut();
        $("#here-btn").fadeOut();
        $("#menu-header").slideUp();
        $("#stop-animation").fadeIn();
        changeMap(to,from);
        toastr["info"](`Вы на нужном этаже. Просто следуйте по указанному маршруту`, "Как добраться?");
    }
    else{
        $(".floor-change").fadeOut();
        $(".cab-search").fadeOut();
        $("#fp-nav").fadeOut();
        $("#here-btn").fadeOut();
        $("#menu-header").slideUp();
        $("#stop-animation").fadeIn();

        changeMap(to,from);
        let current_floor = from;
        if(to.length != from.length && from != "1" && to != "1") toastr["info"](`Спуститесь на 1ый этаж`, "Как добраться?");
        else toastr["info"](`Доберитесь до ${to} этажа`, "Как добраться?");
        floorChangeInterval = setInterval(function() {
            if(to.length != from.length && from != "1" && to != "1"){
                if (current_floor == from){
                    changeMap(from, "1");
                    current_floor = "1";
                    toastr["info"](`Подойтите к лестнице/лифту`, "Как добраться?");
                }
                else{
                    if (current_floor == "1"){

                        changeMap("1",to);
                        current_floor = to;
                        toastr["info"](`Поднимитесь на ${to} этаж и следуйте по указанному маршруту`, "Как добраться?");

                    }
                    else{
                        changeMap(to,from);
                        current_floor = from;
                        toastr["info"](`Спуститесь на 1ый этаж`, "Как добраться?");
                    }
                }
            }
            else{
                if (current_floor == from){
                    changeMap(from,to);
                    current_floor = to;
                    toastr["info"](`Оказавшись на ${to} этаже, следуйте по указанному маршруту`, "Как добраться?");
                }
                else{
                    changeMap(to,from);
                    current_floor = from;
                    toastr["info"](`Доберитесь до ${to} этажа`, "Как добраться?");
                }
            }
        }, 5000);
    }
}

function animateCSS(element, animationName, callback) {
    const node = element;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback();
    }

    node.addEventListener('animationend', handleAnimationEnd);
}

var checkChangeFinish = true;
async function changeMap(prev, next) {
    if(!checkChangeFinish){
        await wait(1000);
    }
    else{
        checkChangeFinish = false;
        $(`#svgObj${next}`).css("visibility", "visible");
        if (parseInt(next, 10) > parseInt(prev, 10)){
            animateCSS($(`#svgObj${prev}`)[0], 'fadeOutDown');
            animateCSS($(`#svgObj${next}`)[0], 'fadeInDown', function(){
                $(`#svgObj${prev}`).css("visibility", "hidden");
                checkChangeFinish = true;
            });
        }
        if (parseInt(next, 10) < parseInt(prev, 10)){
            animateCSS($(`#svgObj${prev}`)[0], 'fadeOutUp');
            animateCSS($(`#svgObj${next}`)[0], 'fadeInUp', function(){
                $(`#svgObj${prev}`).css("visibility", "hidden");
                checkChangeFinish = true;
            });
        }
        if (parseInt(next, 10) == parseInt(prev, 10)){
            if (next == prev) checkChangeFinish = true;
            else {
                animateCSS($(`#svgObj${prev}`)[0], 'fadeOutDown');
                animateCSS($(`#svgObj${next}`)[0], 'fadeInDown', function(){
                    $(`#svgObj${prev}`).css("visibility", "hidden");
                    checkChangeFinish = true;
                });
            }
        }
        CURRFLOOR = next;
        $('.floor-num').removeClass("active");
        $(`.floor-num[value="${next}"]`).addClass("active");
    }
}

jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {
    return this.each(function(){
        var clicks = 0, self = this;
        jQuery(this).click(function(event){
            clicks++;
            if (clicks == 1) {
                setTimeout(function(){
                    if(clicks == 1) {
                        single_click_callback.call(self, event);
                    } else {
                        double_click_callback.call(self, event);
                    }
                    clicks = 0;
                }, timeout || 300);
            }
        });
    });
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

var TARGETFLOOR;
var CURRFLOOR;
var homeFloor;
//var homeDot = JSON.parse(fs.readFileSync('./config.json')).homeDot;
var url = new URL(window.location.href);
var homeDot = url.searchParams.get("homedot");
var svgDocs = {};
var path = [];

//-----------------------------------------------------------------------------------
$('#svgObj1').on("load", function (){
    for (let tmp of $('.floor'))
        svgDocs[$(tmp).attr("id").substring(6)] = tmp.contentDocument;

    changeHomeDot(homeDot);

    for (let x in svgDocs){
        $(svgDocs[x]).click(function(e){
            $("#cab-num").val("");
            keyboard.setInput("");
            $(".nav-keyboard").hide();
            let roomdiv = $(".room"); // тут указываем ID элемента
            if (!roomdiv.is(e.target) // если клик был не по нашему блоку
                && roomdiv.has(e.target).length === 0) { // и не по его дочерним элементам
                clearPath();
            }
        });
        for (let tmp of svgDocs[x].getElementsByClassName("room")){
            $(tmp).single_double_click(function () {
                TARGETFLOOR = CURRFLOOR;
                clearPath();
                markPath(this, svgDocs[x]);
                toastr["info"]("Кликните дважды по объекту, чтобы построить маршрут", "Показать маршрут");
            }, function () {
                TARGETFLOOR = CURRFLOOR;
                clearPath();
                path = g.shortestPath(homeDot, tmp.id);
                if (path[path.length-2][0] == 'd' && getFloorByElementName(path[path.length-2]) != CURRFLOOR){
                    TARGETFLOOR = getFloorByElementName(path[path.length-2]);
                    $($(`#svgObj${x}`)[0]).css("visibility", "hidden");
                }
                drawPath();
            })
        }
    }
});

window.onload = function(){
    $("#sleep_check").bind("drop", function(){
        clearPath();
    })

    document.getElementById("sleep_check").addEventListener('custom-event', function(e){
        if (svgDocs["9a"] == undefined){
            var event = new CustomEvent("custom-event", {'detail': {
                    freeRooms: e.detail.freeRooms
                }});

            setTimeout(() => {
                document.getElementById("sleep_check").dispatchEvent(event);
            }, 3000);
            return;
        }

        for (let x in svgDocs){
            let fr = svgDocs[x].getElementsByClassName("free");
            for (let t of fr){
                t.classList.remove("free");
            }
        }

        for (let room of e.detail.freeRooms){
            let a = `cab${room["number"]}`.split(' ')[0];
            let f = getFloorByElementName(a);
            if (f.length >  1) a = [a.slice(0, 4), 'a', a.slice(4)].join('');
            let elem = svgDocs[f].getElementById(a).getElementsByTagName("path")[0];
            elem.classList.add("free");
        }
    });

    /**********Keyboard*************/
    let Keyboard = window.SimpleKeyboard.default;

    keyboard = new Keyboard(".nav-keyboard", {
        onChange: input => onChange(input),
        onKeyPress: button => onKeyPress(button),
        maxLength: 3,
        theme: "simple-keyboard hg-theme-default hg-layout-numeric numeric-theme hg-layout-custom",
        display: {
            '{bksp}': '<i class="mdi mdi-backspace"></i>',
            '{shift}': '<i class="mdi mdi-magnify-plus"></i>',
            '{shift-back}': '<i class="mdi mdi-numeric"></i>',
            '{wc}': '<i class="mdi mdi-human-male-female"></i>',
            '{food}': '<i class="mdi mdi-food"></i>',
            '{medicine}': '<i class="mdi mdi-medical-bag"></i>',
            '{elevator}': '<i class="mdi mdi-elevator"></i>',
            '{coffee}': '<i class="mdi mdi-coffee"></i>',
            '{library}': '<i class="mdi mdi-book-open-page-variant"></i>'
        },
        buttonAttributes: [
            {
                attribute: "aria-label",
                value: "Столовая",
                buttons: "{food}"
            }
        ],
        buttonTheme: [
            {
                class: "hg-custom",
                buttons: "1 2 3 4 5 6 7 8 9 0 {shift} {bksp} {wc} {food} {medicine} {elevator} {shift-back} {coffee} {library}"
            },
            {
                class: "hg-shift",
                buttons: "{shift}"
            },
            {
                class: "hg-shift-back",
                buttons: "{shift-back}"
            }
        ],
        layout: {
            default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 {bksp}"],
            shift: [ "{coffee} {food}", "{medicine} {elevator}", "{wc} {library}", "{shift-back}"]
        },
        disableCaretPositioning: false
    });

    /**
     * Update simple-keyboard when input is changed directly
     */
    document.querySelector("#cab-num").addEventListener("input", event => {
        keyboard.setInput(event.target.value);
    });

    var last;
    function onChange(input) {
        document.querySelector("#cab-num").value = input;
        /* if (input.length == 1 && input != 0 && input < 7){
            let prev = $(".floor-num.active").val();
            let next = input[0];
            console.log(prev); console.log(next);
            if (prev != next){
                changeMap(prev, next);
            }
        } */
        if (input.length == 3){
            let floorNum = null;
            for (let key in cabFloorMatch) {
                if (cabFloorMatch.hasOwnProperty(key)) {
                    const cabsList = cabFloorMatch[key];
                    for(let i=0; i<cabsList.length; i++){
                        if(cabsList[i] == input){
                            floorNum = key;
                            break;
                        }
                    }
                    if (floorNum != null) break;
                }
            }
            if(floorNum){
                TARGETFLOOR = floorNum;
                let prev = $(".floor-num.active").val();
                let next = floorNum;
                if (prev != next){
                    changeMap(prev, next);
                }
                let floor_html = document.querySelector(`#svgObj${floorNum}`);
                floor_html = floor_html.contentDocument;
                let cab = floor_html.querySelector(`#cab${floorNum}${input[1]}${input[2]}`);
                clearPath();
                markPath(cab, floor_html);
                toastr["info"]("Кликните дважды по объекту, чтобы построить маршрут", "Показать маршрут");
            }else{
                animateCSS(document.querySelector("#cab-search-form"), 'tada');
                anime({
                    targets: "#cab-num",
                    borderColor: 'rgb(255, 133, 133)',
                    color: 'rgb(255, 133, 133)',
                    direction: 'alternate',
                    duration: 500,
                    easing: 'easeInOutQuad'
                });
            }
            /* let floor_html = document.querySelector(`#svgObj${input[0]}`);
            let cab;
            if (floor_html) {
                floor_html = floor_html.contentDocument;
                cab = floor_html.querySelector(`#cab${input}`);
            }
            if (!cab || !floor_html){
                animateCSS(document.querySelector("#cab-search-form"), 'tada');
                anime({
                    targets: "#cab-num",
                    borderColor: 'rgb(255, 133, 133)',
                    color: 'rgb(255, 133, 133)',
                    direction: 'alternate',
                    duration: 500,
                    easing: 'easeInOutQuad'
                });
            }
            else{
                clearPath();
                markPath(cab, floor_html);
                toastr["info"]("Кликните дважды по кабинету, чтобы построить маршрут", "Показать маршрут");
            } */
        }
        last = input;
    }

    function onKeyPress(button) {
        if (button === "{shift}" || button === "{lock}" || button === "{shift-back}") handleShift();
        else if (button === "{wc}") handleWC();
        else if (button === "{coffee}") handleCoffee();
        else if (button === "{medicine}") handleMedicine();
        else if (button === "{food}") handleFood();
        else if (button === "{elevator}") handleElevator();
        else if (button === "{library}") handleLibrary();
    }

    function handleShift() {
        let currentLayout = keyboard.options.layoutName;
        let shiftToggle = currentLayout === "default" ? "shift" : "default";

        keyboard.setOptions({
            layoutName: shiftToggle
        });
    }

    function handleWC(){
        changeMap($(".floor-num.active").val(), homeFloor);
        let floor_html = document.querySelector(`#svgObj${homeFloor}`).contentDocument;
        let cab_elem = floor_html.querySelector(`#tlt${homeFloor}`);
        clearPath();
        markPath(cab_elem, floor_html);
        toastr["info"]("Кликните дважды по объекту, чтобы построить маршрут", "Показать маршрут");
    }
    function handleCoffee(){
        changeMap($(".floor-num.active").val(), 1);
        let floor_html = document.querySelector("#svgObj1").contentDocument;
        let cab_elem = floor_html.querySelector("#cof1");
        clearPath();
        markPath(cab_elem, floor_html);
        toastr["info"]("Кликните дважды по объекту, чтобы построить маршрут", "Показать маршрут");
    }
    function handleMedicine(){
        changeMap($(".floor-num.active").val(), 1);
        let floor_html = document.querySelector("#svgObj1").contentDocument;
        let cab_elem = floor_html.querySelector("#med1");
        clearPath();
        markPath(cab_elem, floor_html);
        toastr["info"]("Кликните дважды по объекту, чтобы построить маршрут", "Показать маршрут");
    }
    function handleFood(){
        changeMap($(".floor-num.active").val(), 0);
        let floor_html = document.querySelector("#svgObj0").contentDocument;
        let cab_elem = floor_html.querySelector("#eat0-1");
        clearPath();
        markPath(cab_elem, floor_html);
        toastr["info"]("Кликните дважды по объекту, чтобы построить маршрут", "Показать маршрут");
    }
    function handleElevator(){
        changeMap($(".floor-num.active").val(), homeFloor);
        let floor_html = document.querySelector(`#svgObj${homeFloor}`).contentDocument;
        let cab_elem = floor_html.querySelector(`#lft${homeFloor}`);
        clearPath();
        markPath(cab_elem, floor_html);
        toastr["info"]("Кликните дважды по объекту, чтобы построить маршрут", "Показать маршрут");
    }
    function handleLibrary(){
        changeMap($(".floor-num.active").val(), 1);
        let floor_html = document.querySelector("#svgObj1").contentDocument;
        let cab_elem = floor_html.querySelector("#lib1");
        clearPath();
        markPath(cab_elem, floor_html);
        toastr["info"]("Кликните дважды по объекту, чтобы построить маршрут", "Показать маршрут");
    }

    $("#cab-keyboard-open").on("click", function(){
        $("#cab-num").val("");
        keyboard.setInput("");
        if ($(".nav-keyboard").css("display") == "none") $(".nav-keyboard").show();
        else $(".nav-keyboard").hide();
    });
    $("#cab-num").on("focus", function(){
        $("#cab-num").val("");
        keyboard.setInput("");
        $(".nav-keyboard").show();
    });


    let flrs = $(".floor-num");
    for(let tmp of flrs){
        tmp.onclick = function (){
            let num = $(this).val();
            CURRFLOOR = num;
            let prev = $(".floor-num.active").val();
            if (prev != num){
                changeMap(prev, num);
            }
        }
    }

    $("#stop-animation").click(function(){
        clearPath();
        $("#menu-header").slideDown();
    });

    $("#here-btn").click(function(){
        changeMap($(".floor-num.active").val(), homeFloor);
    });
}
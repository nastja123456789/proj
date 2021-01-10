var lastNewsUpdate;
var lastClassroomsUpdate;
var lessonTime = {
    1: {
        "begin": "09:00",
        "end": "10:20"
    },
    2: {
        "begin": "10:20",
        "end": "11:50"
    },
    3: {
        "begin": "11:50",
        "end": "13:30"
    },
    4: {
        "begin": "13:30",
        "end": "15:00"
    },
    5: {
        "begin": "15:00",
        "end": "16:30"
    },
    6: {
        "begin": "16:30",
        "end": "18:00"
    },
    7: {
        "begin": "18:00",
        "end": "19:30"
    },
    8: {
        "begin": "19:30",
        "end": "21:00"
    }
}

//var ip = JSON.parse(fs.readFileSync('./config.json')).ip;

function updateNews(cont) {
    var n = (cont == "#onlynews") ? "news_slide" : "";
    $.ajax({
        url: `/api/news`,
        type: "GET",
        beforeSend: function () {
            $(cont).empty();
        },
        error: function (err) {
            console.log("RSS ERROR");
        },
        success: function (data) {
            var posts = data;
            let main = $(cont);
            let c = 'current';
            let miem_img = `/storage/miem.jpg`;
            for (let i = 0; i < data.length; i++){
                let slide = $(`<div class="sleep_slide ${n} ${c}"></div>`);
                slide.append(`<img class="sleep_slide_img" src="${posts[i]["img"] != "" ? posts[i]["img"] : miem_img}">`);
                slide.append(`<div class="sleep_slide_content">
								<div class="h1">${posts[i]["title"]}</div>
								<h3>${posts[i]["text"]}</h3>
							  </div>`);
                slide.append(`<div id="qrcode${i+1}" class="sleep_slide_qrcode"></div>`);
                main.append(slide);
                new QRCode(document.getElementById(`qrcode${i+1}`), posts[i]["link"]);
                c = '';
            }
            lastNewsUpdate = new Date();
            var sleep_slides = (n == "") ? $(".sleep_slide") : $(".news_slide");
            var i = 0;
            setInterval(function () {
                $(sleep_slides[i]).removeClass("current");
                i = (i + 1) % sleep_slides.length;
                $(sleep_slides[i]).addClass("current");
            }, 10 * 1500);
        }
    })
}
updateNews("#news");

function updateSleepClassrooms(currDate, currClass) {
    if (currClass == undefined) currClass = 1;
    $.ajax({
        url: "https://api.hseapp.ru/gateway/ruz/rooms/2211",
        type: "GET",
        data: { date: currDate, classes: currClass },
        beforeSend: function (xhr) {
            $(".left-menu").empty();
        },
        error: function (err) {
            $(".left-menu").empty();
            $(".left-menu").append("<div class='m-auto text-center text-danger'><i class='fa fa-exclamation-triangle'></i> Ошибка подключения</div>");
        },
        success: function (data) {
            let main = $(".left-menu");
            main.append($(`<div class="free-class-title">Свободные аудитории на ${currClass} пару (${lessonTime[currClass]['begin']}-${lessonTime[currClass]['end']})</div>`));

            var event = new CustomEvent("custom-event", {'detail': {
                    freeRooms: data.rooms
                }});
            document.getElementById("sleep_check").dispatchEvent(event);

            let list = $("<ul class='free-classes' id='free-classes-sm'></ul>");
            var j = 0;
            for (let i = 1; i <= 9; i++) {
                let floor, par;
                if (data.rooms[j].floor == i) {
                    floor = $("<li class='floar'></li>");
                    floor.append(`<h6>${i} ЭТАЖ</h6>`);
                    par = $("<p></p>");
                    while (j < data.rooms.length && data.rooms[j].floor == i) {
                        par.append(`${data.rooms[j].number}<small>(${data.rooms[j].capacity})     </small>`);
                        j++;
                    }
                    floor.append(par);
                    list.append(floor);
                }
            }
            main.append(list);
            lastClassroomsUpdate = currClass;
        }
    });
}
let dt = new Date();
let currDate = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
let currTime = `${dt.getHours()}:${dt.getMinutes()}`;
let currClass;
for (let i = 1; i < 9; i++){
    if (currTime >= lessonTime[i]["begin"] && currTime < lessonTime[i]["end"]){
        currClass = i;
        break;
    }
}
updateSleepClassrooms(currDate, currClass);

// запуск Sleep Menu
idleTimer = null;
idleState = false;
idleWait = 2 * 60 * 1000;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

$(document).ready(function () {
    //$(document).bind('mousemove keydown scroll', function(){
    $(document).bind('click scroll', function () {
        clearTimeout(idleTimer);
        if (idleState == true) {
            $('#news-slides').slick('slickNext');
            $("#menu-header").show();
            $("#myContainer").fadeIn();
            $("#sleep_menu").fadeOut();
        }

        idleState = false;
        idleTimer = setTimeout(function () {
            /* let currDate = new Date();
            if (currDate != lastNewsUpdate) updateNews();
            let currTime = `${currDate.getHours()}:${currDate.getMinutes()}`;
            let currClass;
            for (let i = 1; i < 9; i++){
                if (currTime > lessonTime[i]["begin"] && currTime < lessonTime[i]["end"]){
                    currClass = i;
                    break;
                }
            }
            if (currClass != lastClassroomsUpdate) updateSleepClassrooms(); */


            idleState = true;
            $("#sleep_check").trigger("drop");
            toastr.remove();

            $("#menu-header").hide();
            $("#myContainer").fadeOut();
            $("#sleep_menu").fadeIn(1000);

        }, idleWait);
    });
    $("body").trigger("scroll");
});


// отображение времени
var timeNode = document.getElementById('time-node');

function getCurrentTimeString() {
    return new Date().toTimeString().replace(/:[0-9]{2,2} .*/, '');
}

var secCount = 0;
setInterval(function () {
        secCount++;
        timeNode.innerHTML = getCurrentTimeString();
        //Update Menu every hour
        if (secCount == 3600){
            menuRequest();
            secCount = 0;
        }
        //================
        //Update News every 12:00:00
        let dt = new Date();
        if (dt.getHours() == 12 && dt.getMinutes() == 0 && dt.getSeconds() == 0){
            updateNews("#news");
            updateNews("#onlynews");
        }
        //================
        //Update sleep-menu Classrooms every class
        let currDate = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
        let currTime = `${dt.getHours()}:${dt.getMinutes()}`;
        let currClass;
        for (let i = 1; i < 9; i++){
            if (currTime >= lessonTime[i]["begin"] && currTime < lessonTime[i]["end"]){
                currClass = i;
                break;
            }
        }
        if (currClass != undefined && lastClassroomsUpdate != currClass){
            updateSleepClassrooms(currDate, currClass);
        }
        //===================
    },
    1000);


/* $.ajax({
    url: "https://api.hseapp.ru/gateway/ruz/rooms/2211",
    type: "GET",
    data: { date: currentDate, classes: `${numStr.slice(values[0] - 1, values[1])}` },
    beforeSend: function (xhr) {
      $("#free-classes-ruz>*").remove();
      $("#free-classes-ruz").append("<div class='m-auto text-center'><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i></div>");
    },
    error: function (err) {
      $("#free-classes-ruz>*").remove();
      $("#free-classes-ruz").append("<div class='m-auto text-center text-danger'><i class='fa fa-exclamation-triangle'></i> Ошибка подключения</div>");
    },
    success: function (data) {
      $("#free-classes-ruz>*").remove();
      list = $("<ul class='free-classes'></ul>");
      var j = 0;
      for (let i = 1; i <= 9; i++) {
        let floor, par;
        if (data.rooms[j].floor == i) {
          floor = $("<li class='floar'></li>");
          floor.append(`<h6>${i} ЭТАЖ</h6>`);
          par = $("<p></p>");
          while (j < data.rooms.length && data.rooms[j].floor == i) {
            par.append(`${data.rooms[j].number}<small>(${data.rooms[j].capacity})     </small>`);
            j++;
          }
          floor.append(par);
          list.append(floor);
        }
      }
      $("#free-classes-ruz").append(list);
    }
  }); */

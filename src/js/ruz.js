actualDate = new Date();
today = `${actualDate.getDate() < 10 ? 0 : ''}${actualDate.getDate()}.${actualDate.getMonth() + 1 < 10 ? 0 : ''}${actualDate.getMonth() + 1}.${actualDate.getFullYear()}`;
var select = 0;
var numStr = "12345678";
var months = {
    1: "январь",
    2: "Февраль",
    3: "март",
    4: "апрель",
    5: "май",
    6: "июнь",
    7: "июль",
    8: "август",
    9: "сентябрь",
    10: "октябрь",
    11: "ноябрь",
    12: "декабрь"
}
var timeLesson = {
    1: {
        "begin": "09:00",
        "end": "10:20"
    },
    2: {
        "begin": "10:30",
        "end": "11:50"
    },
    3: {
        "begin": "12:10",
        "end": "13:30"
    },
    4: {
        "begin": "13:40",
        "end": "15:00"
    },
    5: {
        "begin": "15:10",
        "end": "16:30"
    },
    6: {
        "begin": "16:40",
        "end": "18:00"
    },
    7: {
        "begin": "18:10",
        "end": "19:30"
    },
    8: {
        "begin": "19:40",
        "end": "21:00"
    }
}
var icons = {
    "student": "mdi-account",
    "group": "mdi-account-group",
    "lecturer": "mdi-school",
    "auditorium": "mdi-door"
}
//var ip = JSON.parse(fs.readFileSync('./config.json')).ip;
var currVariant = {id: "", type: ""};

$('#ruz-datepicker').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'dd.mm.yyyy',
    value: today,
    //minDate: today,
    locale: 'ru-ru',
    weekStartDay: 1,
    change: updateRUZ
});

$('#classrooms-datepicker').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'dd.mm.yyyy',
    value: today,
    //minDate: today,
    locale: 'ru-ru',
    weekStartDay: 1,
    change: updateClassrooms
});

//=========================================

let Keyboard = window.SimpleKeyboard.default;

let keyboard2 = new Keyboard(".ruz-keyboard",{
    onChange: input => onChange2(input),
    onKeyPress: button => onKeyPress2(button),
    mergeDisplay: true,
    theme: "simple-keyboard hg-theme-default hg-layout-default",
    layoutName: "ru",
    display: {
        "{numbers}": "123",
        "{backspace}": '<i class="mdi mdi-backspace"></i>',
        "{shift}": '<i class="mdi mdi-apple-keyboard-shift"></i>',
        "{abc}": "ABC",
        '{lang}': '<i class="mdi mdi-web"></i>',
        '{hide}': '<i class="mdi mdi-keyboard-close"></i>',
    },

    layout: {
        ru: [
            "\u0451 1 2 3 4 5 6 7 8 9 0 {backspace}",
            "\u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a",
            "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d",
            "{shift} \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e",
            "{lang} {space} {hide}"
        ],
        shift_ru: [
            "\u0401 1 2 3 4 5 6 7 8 9 0 {backspace}",
            "\u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a",
            "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d",
            "{shift} \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e",
            "{lang} {space} {hide}"
        ],
        en: [
            "1 2 3 4 5 6 7 8 9 0 {backspace}",
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{shift} z x c v b n m",
            "{lang} {space} {hide}"
        ],
        shift_en: [
            "1 2 3 4 5 6 7 8 9 0 {backspace}",
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{shift} Z X C V B N M",
            "{lang} {space} {hide}"
        ],
    },
    buttonTheme: [
        {
            class: "hg-ruz-custom",
            buttons: "Z X C V B N M A S D F G H J K L Q W E R T Y U I O P z x c v b n m a s d f g h j k l q w e r t y u i o p \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e \u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a \u0401 {shift} \u0451 1 2 3 4 5 6 7 8 9 0 {backspace} \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e {lang} {space} {hide}"
        }
    ],
    disableCaretPositioning: true
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector("#ruz-search").addEventListener("input", event => {
    keyboard2.setInput(event.target.value);
});


var timer = null
function onChange2(input) {
    document.querySelector("#ruz-search").value = input;
    if (timer != null) clearTimeout(timer);
    timer = setInterval(function(){
        if (input != "") {
            searchRequest(input);
        }
        clearTimeout(timer);
    }, 1000);

}

function onKeyPress2(button) {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
    if (button === "{lang}") handleLang();
    if (button === "{hide}") $(".ruz-keyboard").hide();
}

function handleShift() {
    let currentLayout = keyboard2.options.layoutName;
    //let shiftToggle = currentLayout === "ru" ? "shift_ru" : "ru";

    switch (currentLayout) {
        case "ru":
            shiftToggle = "shift_ru";
            break;
        case "shift_ru":
            shiftToggle = "ru";
            break;
        case "en":
            shiftToggle = "shift_en";
            break;
        case "shift_en":
            shiftToggle = "en";
            break;
        default:
            shiftToggle = "ru";
    }

    keyboard2.setOptions({
        layoutName: shiftToggle
    });
}

function handleLang() {
    let currentLayout = keyboard2.options.layoutName;
    //let langToggle = currentLayout === "ru" ? "en" : "ru";

    switch (currentLayout) {
        case "ru":
            langToggle = "en";
            break;
        case "shift_ru":
            langToggle = "shift_en";
            break;
        case "en":
            langToggle = "ru";
            break;
        case "shift_en":
            langToggle = "shift_ru";
            break;
        default:
            langToggle = "ru";
    }

    keyboard2.setOptions({
        layoutName: langToggle
    });
}

//=========================================

var slider = document.getElementById('slider-range');

noUiSlider.create(slider, {
    start: [4, 5],
    connect: true,
    behaviour: "unconstrained-tap",
    range: {
        'min': 1,
        'max': 8
    },
    step: 1,
    tooltips: true,
    format: {
        // 'to' the formatted value. Receives a number.
        to: function (value) {
            return value;
        },
        // 'from' the formatted value.
        // Receives a string, should return a number.
        from: function (value) {
            return Number(value);
        }
    }
}).on('set', updateClassrooms);

$("#prev-day-btn").bind("click", function(){
    let currentDate = $("#classrooms-datepicker").val().split('.');
    currentDate = `${currentDate[2]}.${currentDate[1]}.${currentDate[0]}`;
    let fd = new Date(currentDate);
    fd.setDate(fd.getDate() - 1);
    let td = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 6);
    $("#classrooms-datepicker").val(`${fd.getDate() < 10 ? 0 : ''}${fd.getDate()}.${fd.getMonth() + 1 < 10 ? 0 : ''}${fd.getMonth() + 1}.${fd.getFullYear()}`);
    updateClassrooms();
});

$("#next-day-btn").bind("click", function(){
    let currentDate = $("#classrooms-datepicker").val().split('.');
    currentDate = `${currentDate[2]}.${currentDate[1]}.${currentDate[0]}`;
    let fd = new Date(currentDate);
    fd.setDate(fd.getDate() + 1);
    let td = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 6);
    $("#classrooms-datepicker").val(`${fd.getDate() < 10 ? 0 : ''}${fd.getDate()}.${fd.getMonth() + 1 < 10 ? 0 : ''}${fd.getMonth() + 1}.${fd.getFullYear()}`);
    updateClassrooms();
});

$("#classrooms-clear").click(function(){
    slider.noUiSlider.set([4, 5]);
    //$("#classrooms-datepicker").datepicker();'
    $("#classrooms-datepicker").val(today);
});

/* var timer = null;
$("#ruz-search").bind("input", function(){
	if (timer != null) clearTimeout(timer);
	timer = setInterval(function(){
		if ($("#ruz-search").val() != ""){
			searchRequest($("#ruz-search").val());
			clearTimeout(timer);
		}
	}, 800);
}) */

$(document).click(function (e){ // событие клика по веб-документу
    let ruzkey = $(".ruz-keyboard"); // тут указываем ID элемента
    if (!ruzkey.is(e.target) // если клик был не по нашему блоку
        && ruzkey.has(e.target).length === 0 && !$("#ruz-search").is(e.target)) { // и не по его дочерним элементам
        ruzkey.hide(); // скрываем его
    }
});

$( "#ruz-search" ).focus(function() {
    $(".ruz-keyboard").show();
});

$("#ruz-search-icon").click( function () {
    let fd = new Date();
    fd.setDate((fd.getDate() - (fd.getDay() + 6) % 7));
    let td = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 6);
    $("#ruz-datepicker").val(`${fd.getDate() < 10 ? 0 : ''}${fd.getDate()}.${fd.getMonth() + 1 < 10 ? 0 : ''}${fd.getMonth() + 1}.${fd.getFullYear()}`);
    currVariant = {};
    $('#ruz-search').val("");
    keyboard2.setInput(event.target.value);
    $("#ruz-content").empty();
    $("#search-advice-wrapper").hide();
    fullpage_api.reBuild();
});

$(".nav-item").click( function(){
    $("#stop-animation").click();
    $(".ruz-keyboard").hide();
});




$("#prev-week-btn").bind("click", function(){
    let currentDate = $("#ruz-datepicker").val().split('.');
    currentDate = `${currentDate[2]}.${currentDate[1]}.${currentDate[0]}`;
    let fd = new Date(currentDate);
    fd.setDate((fd.getDate() - (fd.getDay() + 6) % 7));
    fd.setDate(fd.getDate() - 7);
    let td = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 6);
    $("#ruz-datepicker").val(`${fd.getDate() < 10 ? 0 : ''}${fd.getDate()}.${fd.getMonth() + 1 < 10 ? 0 : ''}${fd.getMonth() + 1}.${fd.getFullYear()}`);
    updateRUZ();
});

$("#next-week-btn").bind("click", function(){
    let currentDate = $("#ruz-datepicker").val().split('.');
    currentDate = `${currentDate[2]}.${currentDate[1]}.${currentDate[0]}`;
    let fd = new Date(currentDate);
    fd.setDate((fd.getDate() - (fd.getDay() + 6) % 7));
    fd.setDate(fd.getDate() + 7);
    let td = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 6);
    $("#ruz-datepicker").val(`${fd.getDate() < 10 ? 0 : ''}${fd.getDate()}.${fd.getMonth() + 1 < 10 ? 0 : ''}${fd.getMonth() + 1}.${fd.getFullYear()}`);
    updateRUZ();
});

/* $("#reset-btn").bind("click", function(){
	let fd = new Date();
	fd.setDate((fd.getDate() - (fd.getDay() + 6) % 7));
	let td = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 6);
	$("#ruz-datepicker").val(`${fd.getDate() < 10 ? 0 : ''}${fd.getDate()}.${fd.getMonth() + 1 < 10 ? 0 : ''}${fd.getMonth() + 1}.${fd.getFullYear()}`);
	currVariant = {};
	$('#ruz-search').val("");
	keyboard2.setInput(event.target.value);
	$("#ruz-content").empty();
}) */

function searchRequest(term){
    $.ajax({
        url: `/api/search?str=${term}`,
        type: "GET",
        beforeSend: function (xhr) {
            $("#search-advice-wrapper").hide();
            $("#ruz-search-icon").empty();
            $("#ruz-search-icon").append("<i class='fa fa-spinner fa-pulse fa-1 fa-fw'></i>");
        },
        error: function (err) {
            $("#ruz-search-icon").empty();
            $("#ruz-search-icon").append("<i class='fa fa-exclamation-circle fa-1 fa-fw'></i>");
        },
        success: function (data){
            $("#ruz-search-icon").empty();
            $("#ruz-search-icon").append("<i class='fa fa-times fa-1 fa-fw'></i>");
            $("#search-advice-wrapper").html("").show();
            for (let v of data){
                if (!(v["type"] in icons)) continue;
                $("#search-advice-wrapper").append(`<table style="width: 100%;">
				<tbody class="advice-variant border" data-label="${v["label"]}" data-id="${v["id"]}" data-type="${v["type"]}">
					<tr>
						<td rowspan="2" class="p-1" style="width: 8%;">
							<i class="mdi ${icons[v["type"]]}""></i>
						</td>
						<td class="p-1 font-weight-bold">
							<p style="font-size:10pt;">${v["label"]}</p>
						</td>
					</tr>
					<tr>
						<td class="pb-1 pl-1 font-weight-light">
							<small style="font-size:8pt;">${v["description"]}</small>
						</td>
					</tr>
				</tbody>
				</table>`);
            }
            $(".advice-variant").bind("click", function(){
                currVariant = {id: $(this).attr("data-id"), type: $(this).attr("data-type")};
                updateRUZ();
                $("#search-advice-wrapper").html("").hide();
                $("#ruz-search").val($(this).attr("data-label"));
                keyboard2.setInput($(this).attr("data-label"));
                $(".ruz-keyboard").hide();
            })
        }
    });
}

function mainRuzRequest(type, id, start, finish) {
    $.ajax({
        url: `/api/schedule?type=${type}&id=${id}&start=${start}&finish=${finish}`,
        type: "GET",
        beforeSend: function (xhr) {
            $("#ruz-content").empty();
            $("#ruz-content").append("<center class='mt-3 pt-3'><i class='fa fa-spinner fa-pulse fa-4x fa-fw'></i></center>");
        },
        error: function (err) {
            $("#ruz-content").empty();
            fullpage_api.reBuild();
            console.log("RUZ ERROR");
        },
        success: function (data) {
            $("#ruz-content").empty();
            for (let i = 0; i < data.length; i++) {
                let mainDiv = $("<div class='media day'></div>");
                let dateDiv = `<div class="mr-3"><div class="box-wrapper"><div class="box" style="background-color: transparent">
                        <div class="week"></div>
                        <div class="day"></div>
                        <div class="month"></div>
                      </div></div></div>`;
                if (i == 0 || data[i].dayOfWeek != data[i-1].dayOfWeek) {
                    let x = data[i].date.slice(5, 7);
                    x = x < 10 ? x[1] : x;
                    dateDiv = `<div class="mr-3"><div class="box-wrapper"><div class="box">
                        <div class="week">${data[i].dayOfWeekString}</div>
                        <div class="day">${data[i].date.slice(8)}</div>
                        <div class="month">${months[x]}</div>
                      </div></div></div>`;
                }
                let submainDiv = $("<div class='media-body day-items'></div>");
                let timeDiv = `<div class="media item"><div class="type">
                          <div class="time">${data[i].beginLesson}-${data[i].endLesson}</div>
                          <div><small>${data[i].lessonNumberStart}-я пара</small></div>
                        </div></div>`;
                let infoDiv = $("<div class='media-body'></div>");
                let discDiv = `<div class="mt-0"><div class="title">
                          <span>${data[i].discipline}</span>
                          <div class="text-muted kind">
                            <i class="fa fa-square mr-1 color-practice"></i>
                            ${data[i].kindOfWork}
                          </div>
                        </div></div>`;
                let table = $("<table class='info'></table>");
                table.append(`<tr>
                        <th>
                          <i class="fa fa-map-marker-alt fa-fw mr-1"></i>
                        </th>
                        <td>
                          <span class="auditorium">${data[i].auditorium}</span>
                          <span class="mr-2 text-muted">(${data[i].building})</span>
                        </td>
                      </tr>`);/*
				table.append(`<tr>
                        <th>
                          <i class="fa fa-graduation-cap fa-fw mr-1"></i>
                        </th>
                        <td>
                          <div class="stream">
                            <span class="mr-1" style="font-weight: normal">Поток:</span>
                            <div class="ui-inplace ui-widget">
                              <div class="ui-inplace-display">
                                <span title="Раскрыть">${(data[i].stream ? data[i].stream :
						data[i].subGroup ? data[i].subGroup :
							data[i].group).split('#').pop()}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>`); */
                table.append(`<tr>
                        <th title="Преподаватель">
                          <i class="fa fa-user fa-fw mr-1"></i>
                        </th>
                        <td>
                          <div class="lecturer">${data[i].lecturer}</div>
                        </td>
                      </tr>`);
                infoDiv.append(discDiv); infoDiv.append(table);
                submainDiv.append(timeDiv); submainDiv.append(infoDiv);
                mainDiv.append(dateDiv); mainDiv.append(submainDiv);
                $("#ruz-content").append(mainDiv);
            }
            fullpage_api.reBuild(); //не удалять!!!
        }
    });
}

function updateRUZ(type, id) {
    let currentDate = $("#ruz-datepicker").val().split('.');
    currentDate = `${currentDate[2]}.${currentDate[1]}.${currentDate[0]}`;
    let fd = new Date(currentDate);
    fd.setDate((fd.getDate() - (fd.getDay() + 6) % 7));
    let td = new Date(fd.getFullYear(), fd.getMonth(), fd.getDate() + 6);
    $("#ruz-datepicker").val(`${fd.getDate() < 10 ? 0 : ''}${fd.getDate()}.${fd.getMonth() + 1 < 10 ? 0 : ''}${fd.getMonth() + 1}.${fd.getFullYear()}`);
    mainRuzRequest(
        currVariant["type"],
        currVariant["id"],
        `${fd.getFullYear()}-${fd.getMonth() + 1}-${fd.getDate()}`,
        `${td.getFullYear()}-${td.getMonth() + 1}-${td.getDate()}`
    );
}
updateRUZ();


function updateClassrooms() {
    let values = slider.noUiSlider.get();
    if (values[0] > values[1]) [values[0], values[1]] = [values[1], values[0]];
    let currentDate = $("#classrooms-datepicker").val().split('.');
    currentDate = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
    $.ajax({
        url: "https://api.hseapp.ru/gateway/ruz/rooms/2211",
        type: "GET",
        data: { date: currentDate, classes: `${numStr.slice(values[0] - 1, values[1])}` },
        beforeSend: function (xhr) {
            $("#free-classes-ruz>*").remove();
            $("#lesson-load").show();
            //$("#free-classes-ruz").append("<div class='m-auto text-center'><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i></div>");
        },
        error: function (err) {
            $("#free-classes-ruz>*").remove();
            $("#free-classes-ruz").append("<div class='m-auto text-center text-danger'><i class='fa fa-exclamation-triangle'></i> Ошибка подключения</div>");
        },
        success: function (data) {
            $("#free-classes-ruz>*").remove();
            $("#lesson-load").hide();
            list = $("<ul class='free-classes'></ul>");
            var j = 0;
            for (let i = 1; i <= 9; i++) {
                let floor, par;
                if (data.rooms[j].floor == i) {
                    floor = $("<li class='floar'></li>");
                    floor.append(`<h6 style='font-size: 15pt;'>${i} ЭТАЖ</h6>`);
                    par = $("<p style='font-size: 14pt;'></p>");
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
    });

    $("#lesson-num").text(values[0] == values[1] ? values[0] : values[0] + "-" + values[1]);
    $("#lesson-count").text(values[0] == values[1] ? "пара" : "пары");
    $("#lesson-time").text("(" + timeLesson[values[0]]["begin"] + "-" + timeLesson[values[1]]["end"] + ")");
}

updateClassrooms();

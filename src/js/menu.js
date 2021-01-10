$(".main-menu .nav-link").click(function (e) {
    $(e.currentTarget).siblings(".nav-link").removeClass("active");
    $(e.currentTarget).addClass("active");
});

var MENU;
var COMPLEX;
var today;
//var ip = JSON.parse(fs.readFileSync('./config.json')).ip;

function menuRequest(){
    $.ajax({
        url: `/api/food`,
        type: "GET",
        beforeSend: function (xhr) {
            $("#menu-table").hide();
            $("#complex-list").hide();
        },
        error: function (err) {
            console.log(err);
            menuRequest();
        },
        success: function (data) {
            if (COMPLEX != data["complex"]) {
                $("#complex-list").empty();
                updateComplex(data["complex"]);
                COMPLEX = data["complex"];
                $("#complex-list").show();
            }
            if (MENU != data["menu"]) {
                $("#menu-table").empty();
                updateMenu(data["menu"]);
                MENU = data["menu"];
                $("#menu-table").show();
            }

        }
    });
}
menuRequest();

function updateMenu(menu){
    let main =$(`<table class="table mb-3">
                    <thead style="background-color:#FFF8E3;>
                        <tr">
                            <td colspan="4" align="center">
                                <h2>Меню ${today}</h2>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col">гр.</th>
                            <th scope="col">Наименование</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Калории</th>
                        </tr>
                    </thead>
                </table>`);
    let body = $('<tbody></tbody>');
    for (let type in menu){
        body.append(`<tr style="background-color:#4A7FA4;color:white;"><th colspan="4" scope="row" class="text-uppercase">${type}</th></tr>`);
        for (let i = 0; i < menu[type].length; i++)
            body.append(`<tr><td>${menu[type][i]['weight']}</td><td>${menu[type][i]['name']}</td><td>${menu[type][i]['price']}</td><td>${menu[type][i]['calories']}</td></tr>`);
    }
    main.append(body);
    $("#menu-table").empty();
    $("#menu-table").append(main);
}

function updateComplex(complex){
    $("#complex-list").append(`<div class="text-uppercase text-center h1">Комплексный обед - 120 рублей</div><div class="mb-3 text-center h2">С 11:30 до 16:00</div>`);
    let lst = $('<ul class="list-group col-md-4 m-auto" id="complex-ul"></ul>');
    for (let el of complex){
        let row = `<li class="list-group-item d-flex justify-content-between align-items-center h1">
                        ${el["name"]}
                        <span class="badge badge-dark badge-pill h3">${el["weight"]}</span>
                   </li>`;
        lst.append(row);
    }
    $("#complex-list").append(lst);
}

$(document).ready(function(){
    let ad = new Date();
    today = `${ad.getDate() < 10 ? 0 : ''}${ad.getDate()}.${ad.getMonth() + 1 < 10 ? 0 : ''}${ad.getMonth() + 1}.${ad.getFullYear()}`;
    /* let main =$(`<table class="table mb-3">
                    <thead>
                        <tr class="table-warning">
                            <td colspan="4" align="center">
                                <h2>Меню ${today}</h2>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col">гр.</th>
                            <th scope="col">Наименование</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Калории</th>
                        </tr>
                    </thead>
                </table>`);
    let body = $('<tbody></tbody>');
    for (let type in menu){
        body.append(`<tr class="table-dark"><th colspan="4" scope="row" class="text-uppercase">${type}</th></tr>`);
        for (let i = 0; i < menu[type].length; i++)
            body.append(`<tr><td>${menu[type][i]['weight']}</td><td>${menu[type][i]['name']}</td><td>${menu[type][i]['price']}</td><td>${menu[type][i]['calories']}</td></tr>`);
    }
    main.append(body);
    $("#menu-table").empty();
    $("#menu-table").append(main); */
})

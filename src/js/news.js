//var ip = JSON.parse(fs.readFileSync('./config.json')).ip;
function updateMainNews() {
    cont = "#news-slides"
    $.ajax({
        url: `/api/news`,
        type: "GET",
        beforeSend: function () {
            $(cont).empty();
        },
        error: function (err) {
            console.log("NEWS ERROR");
        },
        success: function (data) {
            var posts = data;
            let c = 'current';
            let miem_img = `/storage/miem.jpg`;
            for (let i = 0; i < data.length; i++){
                $(cont).append(`
                <div class="slider-element" data-bg="${posts[i]["img"] != "" ? posts[i]["img"] : miem_img}" data-qrcode_id="${i}">
                    <img class="slider-img" src="${posts[i]["img"] != "" ? posts[i]["img"] : miem_img}">
                    <div class="news-slides-content">
                        <h2>${posts[i]["title"]}</h2>
                        <p>${posts[i]["text"]}</p>
                    </div>
                    <div id="news-qrcode${i}" class="news-slides-qrcode"></div>
                </div>`);
                new QRCode(document.getElementById(`news-qrcode${i}`), posts[i]["link"]);
            }
            $('#news-slides').slick({
                slidesToScroll: 1,
                //autoplay: true,
                //autoplaySpeed: 5000,
                pauseOnFocus: false,
                pauseOnHover: false,
                speed: 700,
                slidesToShow: 1,
                waitForAnimate: false
            });
            //$(".slick-cloned").remove();
            $(".slick-cloned").each(function(){
                qrid = $(this).data("qrcode_id");
                $(this).find(".news-slides-qrcode").remove();
            });

            $('#news-slides').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                nextElem = slick["$slides"][nextSlide];
                let bg = $(nextElem).data("bg");
                $("#news-slider-bg").css("background-image",`url('${bg}')`);
            });

            $('#news-slides').slick('slickNext');
        }
    })
}

$(document).ready(function(){


    updateMainNews()
});

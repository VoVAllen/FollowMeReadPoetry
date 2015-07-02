var main = function () {
    windowHeight = (typeof window.outerHeight != 'undefined') ? Math.max(window.outerHeight, $(window).height()) : $(window).height();
    $('.card').hide();

    //侧栏导航
    $(".sidebar").height(Math.max(windowHeight, $(".sidebar").height()));
    $('.sidebar').click(function () {
        $(this).addClass('active')
    });


    $('.main').click(function () {
        $('.sidebar').removeClass('active')
    });

    //收起注释<=================================================need to fix
    $('.main').scroll(function () {
        $('.card').removeClass('active')
    });

    //文内点击
    $('.sentence').click(function () {
        $('span').removeClass('active');
        $('.sentence').removeClass('active');
        $('.card').hide().removeClass('active');

        var cardNum = $(this).children('span').length;
        var words = $(this).children("span");
        var idList = [];
        words.each(function () {
            //get card id
            idList.push($(this).attr("id"))
        });
        for (var i = 0; i < idList.length; i++) {
            id = '#card' + idList[i];
            var p = (50 + i * 80) + 'px';
            $(id).animate({left: p});
            $(id).show();
            console.log(id)
        }


        $(this).addClass('active');
        $(this).children("span").addClass('active')
    });


    //
    $(".bar").height(Math.max($('.container').height(), $(".bar").height()));

    //button
    $('.btn').click(function () {

    });

    //展开注释
    $('.card').click(function () {
        $('.card').removeClass('active');
        $(this).addClass('active')
    })

};




$(document).ready(main);

$(document).ready(
    function(){

        //侧边栏滑动效果
        $(document).swipe({
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    $('#sidebar').addClass('active');
                }
                else {
                    $('#sidebar').removeClass('active');
                }
            }
        });


        //导航效果,这里不知道为什么放在main里面会出错所以单独放了


        $(document).on("scroll", onScroll);
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('a').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');

            var target = this.hash,
                    menu = target;
            $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top + 2
            }, 600, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });}
);

function onScroll(event) {
    var scrollPos = $(document).scrollTop();

    $('#sidebar a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#sidebar ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}
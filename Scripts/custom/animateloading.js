$(function () {
    $('#pictureanimateStar').click(function () {
        $('.mypicture').addClass('mypictureSelected');
        $('.colorSize').addClass('showColorSize');
    });
    $(document).scroll(function () {
        $('.colorSize').addClass('showColorSize');
    });

    $('#tryShake').click(function () {
        $('.wrongAnsweInfo').addClass('wrongAnsweInfoShow');
        window.setTimeout(function () {
            $('.wrongAnsweInfo').removeClass('wrongAnsweInfoShow');
        }, 700);
    });

});
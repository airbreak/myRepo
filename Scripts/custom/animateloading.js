$(function () {
    $('#pictureanimateStar').click(function () {
        $('.mypicture').addClass('mypictureSelected');
        $('.colorSize').addClass('showColorSize');
    });
    $(document).scroll(function () {
        $('.colorSize').addClass('showColorSize');
    });
});
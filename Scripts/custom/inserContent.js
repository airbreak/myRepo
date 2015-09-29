/// <reference path="../libs/jquery-1.8.2.min.js" />
$(function () {
    $('#getIt').click(function () {
        //$('#inviteOther').toggle(150);
        $('#inviteOther').slideDown(150);
    });
    $('#coseIt').click(function () {
        $('#inviteOther').slideUp(150);
    });

});
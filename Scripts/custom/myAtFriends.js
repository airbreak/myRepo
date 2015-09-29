/// <reference path="../libs/pinyinSearch/cornerFriendsEngine.js" />

$(function () {
    var starSearch = false;
    var starSearchIndex = -1;
    var keyword = '';
    var oldText = '';

    $(document).on('keydown', '#t', function (e) {
        oldText = $(this).val().toString();
    });

    $(document).on('keyup', '#t', function (e) {
        var nowContent = $(this).val().toString();
        var len = nowContent.length;
        var len1 = oldText.length;
        if (len >= len1) {
            nowContent = nowContent.replace(oldText, '');
        } else {
            nowContent = oldText.replace(nowContent, '');
        }
        //nowContent = nowContent.charAt(nowContent.length - 1);
        if (nowContent == '') {
            return;
        }
        if (nowContent != '@' || starSearch) {
            if (starSearch) {
                if (e.keyCode == 8) {
                    keyword = keyword.substr(0, keyword.length - 1);
                } else {
                    keyword += nowContent;
                }
                if (keyword.length > 10) {
                    keyword = ''
                    starSearch = false;
                }
                showSearchMembersPabel();
            } else {
                $('.atFriendsContianer').hide();
            }
        }

        else {
            $('.atFriendsContianer').hide();
            starSearch = true;
        }
    });

    /*显示检索结果面板*/
    function showSearchMembersPabel() {
        var $tarea = $('#t');
        var $likeTareaDivDom = $('#atResults');
        var offsetLeft = $tarea[0].offsetLeft;
        var tVal = $tarea.val();
        $likeTareaDivDom.html(tVal + '<span class="atFlagPosition">here</span>');
        var posObj = $likeTareaDivDom.find('.atFlagPosition')[0];

        //计算距左边位置
        var offsetLeft1 = posObj.offsetLeft;
        var $atFriendBox = $('.atFriendsContianer');

        var left = offsetLeft + offsetLeft1;

        //计算距上边位置
        var top = posObj.offsetTop + $tarea[0].offsetTop;
        top += 20;
        $atFriendBox.show().css({ 'top': top, 'left': left });
    }


});
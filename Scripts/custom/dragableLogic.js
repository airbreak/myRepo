/// 
var currentMoveElement;
$(function () {

    //$("#myList").sortable({
    //$(".myListConCorner").sortable({
    //    items: ">.candragable",
    //    containment: '.mainContainers',
    //    connectWith: '.myListConCorner',
    //    delay: 1,
    //    helper: "clone",
    //    cursor: "move",
    //    //revert: true,  //动画效果
    //    scroll: true,
    //    //axis: "y",
    //    tolerance: "pointer",

    //    placeholder: "sortableplaceholder",
    //    change: function (event, ui) {
    //        var holder = ui.placeholder[0];
    //        var parentDom = ui.placeholder[0].parentNode;
    //        var holdertop = holder.offsetTop;
    //        var holderleft = holder.offsetLeft;
    //        var ptop = parentDom.offsetTop;
    //        var pheight = parentDom.clientHeight;
    //        var $target = $("#myList");
    //        var scrool = $target[0].scrollTop;
    //        holdertop -= scrool;
    //        if (ptop + pheight - holdertop < 100) {
    //            $target.scrollTop(scrool + 10);
    //            console.log('left:' + holderleft + ',top: ' + holdertop);
    //            return;
    //        }
    //        if (scrool != 0 && holdertop - ptop < 50) {
    //            $target.scrollTop(scrool - 10);
    //            return;
    //        }
    //    },
    //    stop: function () {
    //        var newSort = $('#myList').sortable('serialize');
    //        var newSort1 = $('#myList1').sortable('serialize');
    //        $.post('/Sortable/SortableForMenu', { newSort: newSort }, function (data) {
    //            $('#jquryDragableResult').text(data);
    //        });
    //    },
    //    //containment: $('#myList1')
    //});

    //$("#myList1").sortable({
    //    items: ">.candragable",
    //    containment: '.mainContainers',
    //    connectWith: [$('#myList')],
    //    delay: 1,
    //    cursor: "move",
    //    helper: "clone",
    //    //revert: true,  //动画效果
    //    scroll: true,
    //    //axis: "y",
    //    tolerance: "pointer",
    //    placeholder: "sortableplaceholder",
    //    //stop: function () {
    //    //    $.post('/Sortable/SortableForMenu', { newSort: newSort }, function (data) {
    //    //        $('#jquryDragableResult').text(data);
    //    //    });
    //    //},
    //    //containment: $('#myList')
    //});

    /*滚动条*/
    $("#myList11").sortable({
        items: ">.candragable",
        connectWith: '#myList21',
        delay: 1,
        helper:'.faf',
        cursor: "move",
        scroll: true,
        tolerance: "pointer",
        placeholder: "sortableplaceholder",
        forcePlaceholderSize: true,
        change: function (event, ui) {
            var holder = ui.placeholder[0];
            var holdertop = holder.offsetTop;
            var holderleft = holder.offsetLeft;
            var $parentDom = $(this).parents('.liContainer');
            var ptop = $parentDom[0].offsetTop;
            var pheight = $parentDom[0].clientHeight;

            var scrollMax = $parentDom.cornerSlide('getScrollMaxLength');

            //获得当前的 滚动条的距离
            $cornerSlideContentTop = $parentDom.cornerSlide('getCurrentScrollValue');

            var elementFlag = $parentDom.find('.sortableplaceholder').length > 0;
            var diff = pheight - (holdertop + $cornerSlideContentTop);
            if (diff < 80 && $cornerSlideContentTop <= scrollMax && elementFlag) {
                $parentDom.cornerSlide('scroollByDiff', -60);
                console.log($parentDom.attr('id'));
                return;
            }
            if (diff > 220 && $cornerSlideContentTop < -2 && elementFlag) {
                $parentDom.cornerSlide('scroollByDiff', 60);
                console.log($parentDom.attr('id'));
                return;
            }
        },
        stop: function () {
            //var newSort = $('#myListCorner').sortable('serialize');
            //var newSort1 = $('#myListCorner1').sortable('serialize');
            //$.post('/Sortable/SortableForMenu', { newSort: newSort }, function (data) {
            //    $('#jquryDragableResult').text(data);
            //});
        },
        //containment: $('#myList1')
    });

    $("#myList21").sortable({
        items: ">.candragable",
        //containment: '.mainContainers',
        connectWith: '#myList11',
        delay: 1,
        cursor: "move",
        helper: "clone",
        //revert: true,  //动画效果
        scroll: true,
        helper: "clone",
        //axis: "y",
        tolerance: "pointer",
        placeholder: "sortableplaceholder",
        stop: function () {
            //$.post('/Sortable/SortableForMenu', { newSort: newSort }, function (data) {
            //    $('#jquryDragableResult').text(data);
            //});
        },
        //containment: $('#myList')
    });

    $('#mainContainersUl').sortable({

    });


    $('.maincontainerUlCon').cornerSlide({
        isAutoHide: false
    });
    //$('#mainContainersCorner').cornerSlide({
    //    isAutoHide: false,
    //    scrollType: 'herizontal'
    //}).append('');

    /*使用corner自己的滚动条*/
    $('.taskPanelMain').cornerSlide({
        scrollType: 'herizontal'
    });
    $('.cornerTaskListMainContainer').cornerSlide();


    $('#mainContainersCorner> .cornerSlideContent').css('height', '400');

    /*数据移动事件*/
    $('#mainContainersCorner').on('mousemove mouseup mouseout', function (ev) {
        var helper = $('.myHelperElement');
        if (ev.type == 'mousemove') {
            var flag = $('.sortableplaceholder').length > 0;
            if (flag) {

                //鼠标相对屏幕的距离
                var mx = ev.screenX,
                    my = ev.screenY;

                //当前点击的瓦片元素的位置 相对 屏幕
                var ePos = getElementPos(this),
                    px = ePos.x,
                    py = ePos.y;

                //鼠标当前点击位置 相对图片左上角的 位置
                var diffX = mx - ePos.x,
                    diffY = my - ePos.y - 60;

                //var ss = getMousePositon(ev);
                //var sss = getElementPosition(this);
                $('.myHelperElement').css({ 'left': diffX, 'top': diffY }).show();
                //$('.myHelperElement').css({ 'left': ev.screenX, 'top': ev.screenY });

            }
        }
        else {
            helper.hide();
        }
    });

    /*
    *获取鼠标的当前位置
    */
    function getMousePositon(e) {
        return {
            x: e.pageX || e.clientX + document.body.srollLeft,
            y: e.pageY || e.clientY + document.body.scrollTop
        }
    }

    /*
    *获取元素位置 相对body
    */
    function getElementPos(ele) {

        var pos = { x: null, y: null }
        var offsetParent = ele.offsetParent;
        while (offsetParent) {
            pos.x += ele.offsetLeft;
            pos.y += ele.offsetTop;
            ele = ele.offsetParent;
            offsetParent = ele.offsetParent;
            //if(offsetParent==document.body)
            //return pos;
            //只有body没有offsetParent，body已经是顶级元素了		
        }
        return pos;
    }

    //new Corner.taskBasicPanel($('#myTestAgainDiv'),'12313');

    $('#cornerListUi-0').sortable({
        connectWith: '#cornerListUi-1',
    });
    $('#cornerListUi-1').sortable({
        connectWith: '#cornerListUi-0',
    });

});

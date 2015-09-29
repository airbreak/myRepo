/// <reference path="../libs/jquery-1.8.2.min.js" />
/// <reference path="../libs/pinyinEngine.js" />


$(function () {
    var reg = /@/;
    var cols = document.getElementById('t').cols;
    var width = document.getElementById('t').clientWidth;
    var height = $('textarea').css('line-height');
    var styleHeight = $('textarea')[0].clientHeight;
    var pos = $('textarea').position();

    $('#t').on('keyup', function () {
        var nowContent = $(this).val().toString();
        nowContent = nowContent.charAt(nowContent.length - 1);
        if (!nowContent.match(reg)) {
            $('#atFriendsContianer').hide();
            return;
        }
        el = document.getElementById("t");
        if (el.selectionStart) {
            selection = el.selectionStart;
        }
        else if (document.selection) {
            el.focus();
            var r = document.selection.createRange();
            if (r == null) {
                selection = 0;
            }
            var re = el.createTextRange(),
            rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);
            selection = rc.text.length;
        }
        else {
            selection = 0
        }
        selection = selection * 2.064554;
        var row = Math.floor((selection) / cols);
        var col = (selection - (row * cols));
        var x = Math.floor((col * (width / cols)));
        var y = (parseInt(height) * row);
        var top =(-styleHeight) + 10 + y - $(this).scrollTop();
        var left =15 + x;
        $('#atFriendsContianer').show().css('top', top).css('left', left);
        //$('#atFriendsContianer').show().css('top', pos.top + 10 + y - $(this).scrollTop()).css('left', pos.left + 15 + x);
        $('#atFriendsInput')[0].focus();
        //$('#atContianer').show().html("row: " + row + "<br>columns" + col + "<br>width: " + width + "<br>x: " + x + "px<br>y: " + y + "px<br>Scrolltop: " + $(this).scrollTop()).css('top', pos.top + y - $(this).scrollTop()).css('left', pos.left + 10 + x);
    });


    $(document).on('click', '#atFriendsResultContainer li', function () {

    });

    $(document).on('keyup', '#atFriendsInput', function () {
        var keyword = $(this).val();
        if (keyword != '') {
            var str = '';
            pyEngine.search(keyword, function (data) {
                str += '<li>' + data.name; +'</li>';

            });
            $('#pinyinSerachResult').append(str);
        } else {
            $('#pinyinSerachResult').html('');
        }
    });


    var pinyinData = [
        { content: { name: '蒋建明', pinyinName: 'jiangjianming', pinyinNameShort: 'jjm', desc: '一个爱好吉他的程序员' } },
        { content: { name: '曹晓敏', pinyinName: 'caoxiaomin', pinyinNameShort: 'cxm', desc: '暴力程序员' } },
        { content: { name: '王少波', pinyinName: 'wangshaobo', pinyinNameShort: 'wsb', desc: 'dota打得不错的程序员' } },
        { content: { name: '赵森森', pinyinName: 'zhaosensen', pinyinNameShort: 'zss', desc: '一个爱好编程但是有待加强的程序员' } },
        { content: { name: '郭毅', pinyinName: 'guoyi', pinyinNameShort: 'gy', desc: '一个年长的西北程序员' } }
        //{ content: { name: '蒋建明', pinyinName: 'jiangjianming', desc: '一个爱好吉他的程序员' } },
        //{ content: { name: '曹晓敏', pinyinName: 'caoxiaomin', desc: '一个暴力程序员，使产品秀服务器崩溃' } },
        //{ content: { name: '王少波', pinyinName: 'wangshaobo', desc: 'dota打得不错的程序员' } },
        //{ content: { name: '赵森森', pinyinName: 'zhaosensen', desc: '一个爱好编程但是有待加强的程序员' } },
        //{ content: { name: '郭毅', pinyinName: 'guoyi', desc: '一个年长的西北程序员' } }
    ];

    initPinyinLibs();
    var pyEngine;
    function initPinyinLibs() {

        //var str = 'MaEfSdsfSsdfsAdfssdGsdfEsdf';
        //var newmsg = str.replace(/[a-z]/g, '');
        //var old = str.replace(/[A-Z]/g, '');

        pyEngine = new pinyinEngine();
        var len = pinyinData.length;
        for (var i = 0; i < len; i++) {
            var pinyinName = codefans_net_CC2PY(pinyinData[i].content.name);
            var pinyinNameShort = pinyinName.replace(/[a-z]/g, '');

            //var newReg = /^[A-Z]+$/;
            //var ss = pinyinName.toString().match(newReg);
            //pinyinData[i].content.pinyinName = pinyinName;
            //pinyinData[i].content.pinyinNameShort = pinyinNameShort;
            pyEngine.setCache([pinyinData[i].content.name, pinyinData[i].content.pinyinName, pinyinData[i].content.pinyinNameShort], pinyinData[i].content);
            //pyEngine.setCache([pinyinData[i].content.name], pinyinData[i].content);
        }
    }


    function getAtCpntainer() {
        var str = '<div id="atFriendsContianer">' +
                        '<div id="atFriendshead">' +
                            '<input id="atFriendsInput" type="text" />' +
                        '</div>' +
                        '<div id="atFriendsTips">选择想要@的成员</div>' +
                        '<ul id="atFriendsResultContainer">' +
                            '<li>' +
                                '<div class="atFriendsItems">' +
                                    '<div class="left">' +
                                        '<img src="../../Content/images/2014-12-27_154451.jpg" />' +
                                    '</div>' +
                                    '<div class="right">' +
                                        '<label>无法无天无牵无挂</label>' +
                                    '</div>' +
                                '</div>' +
                            '</li>' +
                            '<li>' +
                                '<div class="atFriendsItems">' +
                                    '<div class="left">' +
                                        '<img src="../../Content/images/2014-12-27_154451.jpg" />' +
                                    '</div>' +
                                    '<div class="right">' +
                                        '<label>无法无天无牵无挂</label>' +
                                    '</div>' +
                                '</div>' +
                            '</li>' +
                            '<li>' +
                                '<div class="atFriendsItems">' +
                                    '<div class="left">' +
                                        '<img src="../../Content/images/2014-12-27_154451.jpg" />' +
                                   '</div>' +
                                    '<div class="right">' +
                                        '<label>无法无天无牵无挂</label>' +
                                    '</div>' +
                                '</div>' +
                            '</li>' +
                        '</ul>' +
                    '</div>';
        return str;
    }

});
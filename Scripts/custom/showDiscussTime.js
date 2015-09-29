$(function () {

    $('#getTimeFormate').click(function () {
        var val = $('#getTimeFormateText').val();
        $('#showTime').text(aaa(val));
        $('#sfe').val('1231344324');
    });

    $('#getTimeFormate1').click(function () {
        var val = $('#getTimeFormateText1').val();
        $('#showTime1').text(aa(val));
        $('#sfe').val('');
    });

    function aa(mydatestring) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfmonth = day * 15;
        var month = day * 30;
        var year = month * 12;
        var diff = new Date() - Date.parse(mydatestring.replace(/-/gi, "/"));
        var result = '';
        if (diff < 0) {
            alert('wrong');
            return;
        }

        var monthR = diff / month;
        var yearR = diff / year;
        var weekR = diff / (7 * day);
        var dayC = diff / day;
        var hourC = diff / hour;
        var minC = diff / minute;

        if (yearR >= 1) {
            result = parseInt(yearR) + '年前';
            return result;
        }
        else if (monthR >= 1) {
            result = parseInt(monthR) + '个月前';
            return result;
        }

        else if (weekR >= 1) {
            result = parseInt(weekR) + '星期前';
            return result;
        }
        else if (dayC >= 1) {
            return result;
        }
        else if (hourC >= 1) {
            result = parseInt(hourC) + '小时前';
            return result;
        }
        else if (minC >= 1) {
            result = parseInt(minC) + '分钟前';
            return result;
        } else {
            result = '刚刚';
            return result;
        }
    }

    function aaa(mydatestring) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var recordTimeInt = Date.parse(mydatestring.replace(/-/gi, "/"));
        var recordTime = new Date(recordTimeInt);
        var diff = new Date() - recordTimeInt;
        var result = '';
        if (diff < 0) {
            alert('wrong');
            return;
        }
        var weekR = diff / (7 * day);
        var dayC = diff / day;
        var hourC = diff / hour;
        var minC = diff / minute;
        if (weekR >= 1) {
            result = recordTime.getFullYear() + '.' + (recordTime.getMonth() + 1) + '.' + recordTime.getDate();
            return result;
        }
        else if (dayC >= 1) {
            result = parseInt(dayC) + '天前';
            return result;
        }
        else if (hourC >= 1) {
            result = parseInt(hourC) + '小时前';
            return result;
        }
        else if (minC >= 1) {
            result = parseInt(minC) + '分钟前';
            return result;
        } else {
            result = '刚刚';
            return result;
        }
    }


});
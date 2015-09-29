$(function () {
    /*定义一个方法 rockMeber 有两个属性 name、location*/
    var rockMeber = function (name, loction) {
        this.name = name;
        this.loction = loction;
    };

    /*再定义一个方法 rockTeam 会调用rockMeber*/
    var rockTeam = function (name, loction, teamName) {
        /*
        *可以这么理解：this为当前的rockTeam,arguments为参数列表数组形式。
        *执行apply方法时，rockMeber中的this就是rockTeam,
        *所以rockTeam也会有name、location属性并进行赋值。
        *同时会将this(rockTeam)返回。所以我们进行输出时，rockteam就会有相应的属性值。
        *也可以这么理解为：rockMeber将属性创建到了rockTeam对象里面。
        */
        rockMeber.apply(this, arguments);
        
        this.teamName = teamName;
    };

    $('#havetry').click(function () {
        var rockteam = new rockTeam('石头', '吉他手', 'mayday');
        $('#result').text('名字：' + rockteam.name + '   ' + '职位：' + rockteam.loction + '   ' + '乐队：' + rockteam.teamName);
    });

    $('#getMinMax').click(function () {
        var arr = [1, 2, 3, 4, 5, 6, 7, 0.9, 11];
        var min = Math.min.apply(null, arr);
        var max = Math.max.apply(null, arr);
        alert('min:'+min+'  max:'+max);
    });

    $('#unite').click(function () {
        //var arrA = ['1', '2', '3'];
        //var arrB = [4, 5, 6];
        //Array.prototype.push.apply(arrA, arrB);
        //var str = 'newArr:[';
        //for (var i = 0; i < arrA.length; i++) {
        //    str += arrA[i] + ',';
        //}
        //str = str.substr(0, str.length - 1)+']';
        //alert(str);

        var colors = ['red', 'blue', 'green','yellow', 'purple'];
        var newColors = colors.slice(colors);
        alert(newColors);
        alert(colors);
    });

});
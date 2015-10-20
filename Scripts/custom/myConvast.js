
var canvas, context;
var img,//图片对象
    imgIsLoaded,//图片是否加载完成;
    imgX = 100,
    imgY = 100,
    imgScale = 0.5;

(function int() {
    canvas = document.getElementById('bargraphCanvas');
    context = canvas.getContext('2d');
    loadImg();
    canvasEventsInit();
    var objA = { name: 'mayday', region: 'taiwan' };
    for (var item in objA) {
        var name = item;
        var value = objA[item];
    }

    $('#mybtn').click(function () {

        var ss = new subTestClass("123", {
            name: '1234',
            value: '12345'
        });

    });

    var TestClass = function () {
        var length = arguments.length;
        var F = arguments[length - 1];
        var P = arguments[0];
        var C = P.initialize;
        //C.prototype = F;
        return C;
    };

    var subTestClass = TestClass({
        initialize: function (name, value) {
            name;
        }
    });



})();

function loadImg() {
    img = new Image();
    img.onload = function () {
        imgIsLoaded = true;
        drawImage();
    }
    img.src = '../../Content/images/mayday.jpg';
}

function drawImage() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
            img, //规定要使用的图像、画布或视频。
            0, 0, //开始剪切的 x 坐标位置。
            img.width, img.height,  //被剪切图像的高度。
            imgX, imgY,//在画布上放置图像的 x 、y坐标位置。
            img.width * imgScale, img.height * imgScale  //要使用的图像的宽度、高度
        );
}

/*事件注册*/
function canvasEventsInit() {
    canvas.onmousedown = function (event) {
        var pos = windowToCanvas(event.clientX, event.clientY);  //坐标转换，将窗口坐标转换成canvas的坐标

        canvas.onmousemove = function (evt) {  //移动
            canvas.style.cursor = 'move';
            var posl = windowToCanvas(evt.clientX, evt.clientY);
            var x = posl.x - pos.x;
            var y = posl.y - pos.y;
            pos = posl;
            imgX += x;
            imgY += y;
            drawImage();  //重新绘制图片
        };
        canvas.onmouseup = function () {
            canvas.onmousemove = null;
            canvas.onmouseup = null;
            canvas.style.cursor = 'default';
        };
    };

    canvas.onmousewheel = canvas.onwheel = function (event) {    //滚轮放大缩小
        var pos = windowToCanvas(event.clientX, event.clientY);
        event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltalY * (-40));  //获取当前鼠标的滚动情况
        if (event.wheelDelta > 0) {
            imgScale *= 2;
            imgX = imgX * 2 - pos.x;
            imgY = imgY * 2 - pos.y;
        } else {
            imgScale /= 2;
            imgX = imgX * 0.5 + pos.x * 0.5;
            imgY = imgY * 0.5 + pos.y * 0.5;
        }
        drawImage();   //重新绘制图片
    };
}

/*坐标转换*/
function windowToCanvas(x, y) {
    var box = canvas.getBoundingClientRect();  //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
    return {
        x: x - box.left - (box.width - canvas.width) / 2,
        y: y - box.top - (box.height - canvas.height) / 2
    };
}


/********图片拼接*********/
//var arr = [
//            { x: 0, y: 0, url: './../Content/map/1_3.png' },
//            { x: 512, y: 0, url: './../Content/map/1_4.png' },
//            { x: 0, y: 512, url: './../Content/map/2_3.png' },
//            { x: 512, y: 512, url: './../Content/map/2_4.png' }
//];
//$(function () {
//    var imgArr = [];

//    canvas = document.getElementById('bargraphCanvasSet');
//    context = canvas.getContext('2d');

//    var canvas1 = document.getElementById('bargraphCanvasSet1');
//    var context1 = canvas1.getContext('2d');

//    $('#mybtnSet').click(function () {
//        loadImg();
//    });
//    var index=0;
//    function loadImg() {
//        img = new Image();

//        img.onload = function () {
//            var ss = img.nameProp;
//            var x2, y2;
//            for (var i = 0; i < 4; i++) {
//                if (arr[i].url.indexOf(ss) > 0) {
//                    x2 = arr[i].x;
//                    y2 = arr[i].y;
//                    break;
//                }
//            }
//            imgIsLoaded = true;
//            imgArr.push(img);


//            context.drawImage(img, x2, y2);
//            context1.drawImage(img, x2, y2);

//            index++;
//            if (index > 3) {
//                return;
//            }
//            loadImg(i);
//        }
//        img.src = arr[index].url;
//    }


//    $('#getImgFromCanvas').click(function () {
//        var canvas = document.getElementById('bargraphCanvasSet1');
//        var img = canvas.toDataURL("image/png");
//        $('#imgFromCanvas').attr('src', './../Content/map/1_7.png');
//    });

//    $('#getFileSize').click(function () {
//        $('#imgFromCanvas')[0].fileSize;
//    });

//});


/*绘制线*/
//普通直线
function DrawLinCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
};

DrawLinCanvas.prototype = {
    contructor: DrawLinCanvas,
    drawNormalLine: function () {
        this.clearCanvas();
        this.ctx.moveTo(20, 20);
        this.ctx.lineTo(150, 150);
        this.ctx.lineTo(210, 340);
        this.ctx.strokeStyle = '#707074';
        this.ctx.stroke();
    },
    drawDiffColorNormalLine: function () {
        this.clearCanvas();
        this.ctx.moveTo(100, 30);
        this.ctx.lineTo(180, 250);
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(40, 40);
        this.ctx.lineTo(400, 200);
        this.ctx.strokeStyle = 'blue';
        this.ctx.stroke();
    },
    drawGradientLine: function () {
        this.clearCanvas();

        var grd = this.ctx.createLinearGradient(0, 0, 170, 0);
        grd.addColorStop(0, 'black');
        grd.addColorStop(0.2, 'red');
        grd.addColorStop(1, 'yellow');

        this.ctx.moveTo(100, 30);
        this.ctx.lineTo(180, 250);
        this.ctx.lineTo(0, 450);
        this.ctx.strokeStyle = grd;
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

    },
    drawPatternLine: function () {
        this.clearCanvas();
    },
    clearCanvas: function () {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, 800, 400);
    }
};

var drawLinCanvas = new DrawLinCanvas(document.getElementById('drawLinCanvas'));

document.getElementById('normalLine').onclick = function () {
    drawLinCanvas.drawNormalLine();
};

document.getElementById('diffColorNormalLine').onclick = function () {
    drawLinCanvas.drawDiffColorNormalLine();
};


document.getElementById('gradientLine').onclick = function () {
    drawLinCanvas.drawGradientLine();
};


document.getElementById('patternLine').onclick = function () {
    drawLinCanvas.drawPatternLine();
};
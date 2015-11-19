window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;
$(function () {

    function myCanvasWave() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.parentNode.offsetWidth;
        this.canvas.height = this.canvas.parentNode.offsetHeight;
        this.step = 0;
        window.requestAnimationFrame($.proxy(this, 'drawBlueWater'));
    }

    myCanvasWave.prototype = {

        //绘制水
        drawBlueWater: function () {
            var height = this.canvas.height,
                width = this.canvas.width;
            this.context.clearRect(0, 0, width, height);
            
            
            var lines = ["rgba(0,222,255, 0.2)", "rgba(157,192,249, 0.2)", "rgba(0,168,255, 0.2)"];
            this.step++;
            for (var i = 0; i < 3; i++) {
                this.context.fillStyle = lines[i];
                var angle = (this.step +i*45)* Math.PI / 180,
                    deltaHeight = Math.sin(angle) * 50,
                    deltaHeightRight = Math.cos(angle) * 50;
                this.context.beginPath();

                this.context.moveTo(0, height / 2 + deltaHeight); //左上角

                //this.context.lineTo(width, height / 2 + deltaHeightRight); //右上角

                //曲线
                var conPointX = width / 2,
                    conPointY1 = height / 2 + deltaHeight,
                    conPointY2 = height / 2 + deltaHeightRight;
                this.context.bezierCurveTo(conPointX, conPointY1,
                    conPointX, conPointY2,
                    width, height / 2 + deltaHeightRight);

                this.context.lineTo(width, height); //右下角

                this.context.lineTo(0, height);//左下角

                this.context.lineTo(0, height / 2 + deltaHeight); //左上角

                this.context.closePath();
                this.context.fill();
            }
            window.requestAnimationFrame($.proxy(this,'drawBlueWater'));
        },
    };

    new myCanvasWave();

});
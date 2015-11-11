$(function () {
    
    function myCanvasWave() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.parentNode.offsetWidth;
        this.canvas.height = this.canvas.parentNode.offsetHeight;
        this.step = 0;
        window.requestAnimFrame(this.drawBlueWater);
    }

    myCanvasWave.prototype = {

        //绘制水
        drawBlueWater: function () {
            var height = this.canvas.height,
                width = this.canvas.width;
            this.context.clearRect(0, 0, height, width);
            this.context.fillStyle = 'rgba(0,222,255,0.2)';
            this.step++;

            var angle = this.step * Math.PI / 180,
                deltaHeight = Math.sin(angle) * 50;
            this.context.beginPath();

            this.context.moveTo(0, height / 2 + deltaHeight); //左上角
            this.context.lineTo(0, height);//左下角
            this.context.lineTo(width, height); //右下角
            this.context.lineTo(width, height / 2 + deltaHeight); //右上角
            
            this.context.lineTo(0, height / 2 + deltaHeight); //左上角

            this.context.closePath();
            this.context.fill();
            window.requestAnimFrame(this.drawBlueWater);
        },


        requestAnimFrame: function (callback) {
            var r1 = window.requestAnimationFrame,
                r2 = window.webkitRequestAnimationFrame,
                r3 = window.mozRequestAnimationFrame,
                r4 = function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            return r1 || r2 || r3 || r4;
        },



    };

    new myCanvasWave();

});

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
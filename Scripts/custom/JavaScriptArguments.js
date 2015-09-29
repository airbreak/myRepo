
window.onload = function(){
    function dada(name){
       console.log(arguments.length);//获取实际被传递参数的数值。
       console.log(dada.length);// // 获取期望参数的数值，函数定义时的预期参数个数
       console.log("i'm " + name + arguments[1] + " years old." + "i'm in " + arguments[2]);//name等于arguments[0]
    }
    dada("jimmy", 21, "wuhan");
}
/// <reference path="../../libs/require.js" />
require.config({
    baseUrl: '/Scripts/',
    paths: {
        jquery: 'libs/jquery-1.8.2.min',
        drawLine: 'custom/requirejs/drawline',
        drawCircle: 'custom/requirejs/drawcircle',
    }
});

require([
    'jquery', 
    'drawLine',
    'drawCircle',
]);

//require(['jquery', 'drawCircle', 'drawLine'], function ($, myDrawCircle, myDrawLine) {
//    myDrawLine.drawNormalLine();
//});
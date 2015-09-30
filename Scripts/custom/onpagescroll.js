/// <reference path="../libs/onepagescroll/jquery.fullPage.js" />


$(function(){
    var runPage;
    $('#pageContain').fullpage({
        'verticalCentered': false,
        'css3': true,
        'sectionsColor': ['#254875', '#00FF00', '#254587', '#695684'],
        anchors: ['page1', 'page2', 'page3', 'page4'],
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple']
    });
    
});
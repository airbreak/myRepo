$(function () {
    $("#discussDetailContent").html('<li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li><li>sfsf</li>');
    $('#addInfo').click(function () {
        $("#discussDetailContent").append("<li>测试测试测试测试测试</li>");
    });

    $('#testDatepickter').datetimepicker({
        format:'yyyy-mm-dd',
        minView: 2,
        todayHighlight: true,
        autoclose: true
    });

});
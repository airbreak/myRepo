/// <reference path="../libs/jquery-1.7.1.min.js" />
/// <reference path="../libs/jcrop/jquery.Jcrop.min.js" />
/// <reference path="../libs/jquery.form.js" />
$(function () {
    var jcrop_api;
    var region ={
        x: 10,
        y: 10,
        x2: 190,
        y2: 190,
        height: 180,
        width: 180,
        sessionId: ''
    };
    var sessionId;

    /*提交表单*/
    //$('#uploadImg').click(function () {
    $('#dataImportFileInput').change(function(){
        var value = $('#dataImportFileInput').val();
        if (value == '') {
            alert('请选择图片！');
            return;
        }
        $("#metalSpeedInputForm").ajaxSubmit({
            url: window.baseUrl + "CropUserPhoto/UploadUerPhoto",
            type: 'post',
            beforeSubmit: function () {

            },
            complete: function (data) {
                if (data.responseText != "fail") {
                    sessionId = data.responseText.split(',')[1];
                    region.sessionId = sessionId;
                    showNewPhoto(sessionId);
                   
                }
                if (data.responseText == "fail") {
                    alert("文件上传失败，请检查文件是否合法！");
                }
            },
            error: function (e) {

            }
        });
    });

    function showNewPhoto(id) {
        //$('#testImg').attr('src', baseUrl + 'CropUserPhoto/GetUploadImg?sessionId=' + id);
        $('#newPhoto').show().find('img').attr('src', baseUrl + 'CropUserPhoto/GetUploadImg?sessionId=' + id);
        $('#origalPhoto').hide();
        //initJcrop();
    }


    function initJcrop() {
        $('#newPhoto img').Jcrop({
            onRelease: function () { },
            onSelect: function (c) {
                region = {
                    x: c.x,
                    y: c.y,
                    x2:c.x2,
                    y2:c.y2,
                    height:c.h,
                    width:c.w,
                    sessionId:sessionId
                };
            },
            onChange: function (c) {
               
            }
        }, function () {
            jcrop_api = this;
            jcrop_api.animateTo([10, 10, 190, 190]);
            //$('.requiresjcrop').show();
        });
    }//

    $('#excuseCrop').click(function () {
        $.post(baseUrl + 'CropUserPhoto/CropeImg', region, function (data) {
            if (data != 'fail') {
                $('#newPhoto').show().find('img').attr('src', baseUrl + data);
                jcrop_api.destroy();  //完成裁剪
            } else {

            }
        });
    });

});
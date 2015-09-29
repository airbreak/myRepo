//var pasteImput = document.getElementById('pasteImgInput');
var $input = $('#pasteImgInput');
$input.on('paste', function () {
    var clipboardData = event.clipboardData,
        i = 0,
        items, item, types;
    if (clipboardData) {
        items = clipboardData.items;
        if (!items) {
            return;
        }
        item = items[0];
        //保存在
        types = clipboardData.types || [];
        for (; i < types.length; i++) {
            if (types[i] == 'Files') {
                item = items[i];
                break;
            }
        }
        // && item.type.match(/^image\/i)
        if (item && item.kind === 'file' && item.type.match(/image/i)) {
            imgReader(item);
        }

    }
});
//pasteImput.addEventListener('paste', function () {
//    var clipboardData = event.clipboardData,
//        i = 0,
//        items, item, types;
//    if (clipboardData) {
//        items = clipboardData.items;
//        if (!items) {
//            return;
//        }
//        item = items[0];
//        //保存在
//        types = clipboardData.types || [];
//        for (; i < types.length; i++) {
//            if (types[i] == 'Files') {
//                item = items[i];
//                break;
//            }
//        }
//        // && item.type.match(/^image\/i)
//        if (item && item.kind === 'file' && item.type.match(/image/i)) {
//            imgReader(item);
//        }

//    }
//});

function imgReader(item) {
    var blob = item.getAsFile(),
        reader = new FileReader();

    reader.onload = function () {
        var img = new Image();
        img.src = this.result;
        var data = this.result.substr(this.result.indexOf(",") + 1);
        var newData = {a:'123',data:data};
        $.post('/ShowImgFromImgByte/PasteImage', newData,
                function (b) {
                    alert(b);
                });
        document.body.appendChild(img);
    };

    reader.readAsDataURL(blob);
};
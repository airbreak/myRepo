$(function () {
    $('#addMoreImg').click(function () {
        var str = '123' +
                    '<li><img src="../../Content/images/voteImgs/1.png"  /></li>' +
                    '<li><img src="../../Content/images/voteImgs/2.png" data-original="../../Content/images/voteImgs/2.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/3.png" data-original="../../Content/images/voteImgs/3.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/4.png" data-original="../../Content/images/voteImgs/4png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/5.png" data-original="../../Content/images/voteImgs/5.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/6.png" data-original="../../Content/images/voteImgs/6.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/7.png" data-original="../../Content/images/voteImgs/7.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/8.png" data-original="../../Content/images/voteImgs/8.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/9.png" data-original="../../Content/images/voteImgs/9.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/10.png" data-original="../../Content/images/voteImgs/10.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/11.png" data-original="../../Content/images/voteImgs/11.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/12.png" data-original="../../Content/images/voteImgs/12.png" /></li>' +
                    '<li><img src="../../Content/images/voteImgs/13.png" data-original="../../Content/images/voteImgs/13.png" /></li>';
        $('.lazyContainer').append(str);

        
        $('.lazyContainer img').lazyload({
            effect: "fadeIn",
            placeholder: "../../Content/images/loading.gif",
            container: $(".main")
        });
    });

});
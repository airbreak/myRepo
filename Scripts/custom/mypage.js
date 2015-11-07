$(function () {
    $('.tedPageCode').createPage({
        pageCount: 6,
        current:1,
        backFn: function (e) {
            console.log(e);
        }
    });
});
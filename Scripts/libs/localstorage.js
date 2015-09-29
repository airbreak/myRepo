
$(function () {
    var storage = window.localStorage;
    if (!storage.getItem('pageLoadCount')) {
        storage.setItem('pageLoadCount', 0);
    }
    storage.pageLoadCount = parseInt(storage.getItem('pageLoadCount')) + 1;
    document.getElementById('pageLoadCount').innerHTML = storage.pageLoadCount;
});

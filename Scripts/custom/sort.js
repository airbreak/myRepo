$(function () {
    var orgVlaues = [1, 5, 8, 90, 56, 100, 25],
        orgVlaues1 = [1, 5, 8, 90, 56, 100, 25],
        orgVlaues2 = [1, 5, 8, 90, 56, 100, 25];

    var result = orgVlaues.sort();
    var rightResult = orgVlaues1.sort(compare);
    var reverseResult = orgVlaues2.reverse(compare);

    document.getElementById('orgValue').innerText = result;
    document.getElementById('rightValue').innerText = rightResult;
    document.getElementById('reverseValue').innerText = reverseResult;
    
    function compare(val1, val2) {
        return val1-val2;
    }


    //对象排序
    var data = [{ name: "Jimmy", age: 25},{name: "Stephen", age: "24"},{name: "Alex", age: 26 }];
    data.sort(createComparisonFunction('name'));
    document.getElementById('sortByNameValue').innerText =JSON.stringify(data);
    data.sort(createComparisonFunction('age'));
    document.getElementById('sortByAgeValue').innerText = JSON.stringify(data);

    function createComparisonFunction(propertyName) {
        return function (object1, object2) {
            var val1 = object1[propertyName];
            var val2 = object2[propertyName];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }

});
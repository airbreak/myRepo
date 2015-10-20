/// <reference path="../libs/Angular/angular.min.js" />
//InvoiceCntl();
var app = angular.module('myApp', []);
app.controller('myContrller', function ($scope, $http) {
    $scope.message = 'Hello ,Angular JS';
    //var watch = $scope.$watch('message', function (newValue, oldValue, scope) {
    //    console.log(newValue);
    //    console.log(oldValue);
    //});

    //$timeout(function () {
    //    $scope.message = "Hello ,jQuery";
    //}, 1000);
});

app.controller('HelloController', function ($scope, $http) {
    $scope.person = {
        name: 'Jimmy'
    };
    $scope.sayHelloWorld = function () {
        alert($scope.person.name);
    }
});

app.controller('shoppingController', function ($scope, $http) {
    //$.post('/Shop/Products', null, function (data) {
    //    $scope.items = data;
    //});
    $http({
        method: 'POST',
        url: '/Shop/Products',
        data: { fileInfo: 'dds' },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

    }).success(function (data) {
        data = JSON.parse(data);
        $scope.items = data;
    }).error(function () {
        alert('error');
    });
    //$http.get('/Shop/Products').success(function (data, status, headers, config) {
    //    $scope.items = data;
    //});
});

app.controller('formCheck', function ($scope, $http) {
    $scope.executeCheck = function () {
        var ss = $scope.form;
        console.log(ss);
    };
    $scope.save = function (newUser) {
        if ($scope.form.$valid) {
            $http({
                method: 'POST',
                url: '/Shop/FormSubmit',
                data: newUser
                //data: JSON.stringify($scope.formData),
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

            }).success(function (data) {
                data = JSON.parse(data);
                $scope.items = data;
            }).error(function () {
                alert('error');
            });
        } else {
            alert('不可以提交');
        }
    };
});

app.controller('CartController', function ($scope, $http) {
    $scope.bill = {};
    $scope.items = [
      { title: 'Paint pots', quantity: 8, price: 3.95 },
      { title: 'Polka dots', quantity: 17, price: 12.95 },
      { title: 'Pebbles', quantity: 5, price: 6.95 }
    ];
    $scope.totalCart = function () {
        var total = 0;
        for (var i = 0, len = $scope.items.length; i < len; i++) {
            total = total + $scope.items[i].price * $scope.items[i].quantity;
        }
        return total;
    };
    $scope.subtotal = function () {
        return $scope.totalCart() - $scope.discount;
    };
    function calculateDiscount(newValue, oldValue, scope) {
        $scope.bill.discount = newValue > 100 ? 10 : 0;
    }
    $scope.$watch($scope.totalCart, calculateDiscount);
});

//查询和过滤

app.controller('FilterAndQuery', function ($scope) {
    $scope.persons = [
        { name: 'Jimmy', age: 25 },
        { name: '大傻逼', age: 24 },
        { name: '小逼挺帅', age: 29 }
    ];
    $scope.order = 'age';

});

//投票系统
app.controller('VoteImgController', function ($scope, $http) {
    $http({
        method: 'POST',
        url: '/Shop/VoteImgs',
        data: { fileInfo: 'dds' },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

    }).success(function (data) {
        data = JSON.parse(data);
        $scope.items = data;
    }).error(function () {
        alert('error');
    });

    $scope.voteIt = function () {
        return count = count + 1;
    };

});

app.directive("hello", function () {
    return {
        restrict: 'E',
        template: '<div>Hi there</div>',
        replace: true
    };
});
app.directive('fuck', function () {
    return {
        restrict: 'E',
        template: '<div class="youfuck">Hi there<span ng-transclude></span></div>',
        transclude: true
    };
});

app.controller('SomeController', function ($scope) {
    $scope.title = '点击展开';
    $scope.text = '这里是内部的内容';
});

app.directive('expander', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            title: '=expanderTitle'
        },
        template: '<div>' +
                        '<div class="title" ng-click="toggle()">{{title}}</div>' +
                        '<div class="body" ng-show="showMe" ng-transclude></div>' +
                        '</div>',
        link: function (scope, element, attrs) {
            scope.showMe = false;
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
            };
        }
    };
});

/*watch*/
app.controller('WatchTestController', function ($scope, $parse) {
    $scope.$watch('expr', function (newVal, oldVal, scope) {
        if (newVal !== oldVal) {
            var parseFun = $parse('expr');
            $scope.parsedValue = parseFun(scope);
        }
    });
});

app.controller('EmailTestController', function ($scope, $interpolate) {
    $scope.$watch('emailBody', function (body) {
        if (body) {
            var template = $interpolate(body);
            $scope.previewText = template({ to: $scope.to });
        }
    });
});

/*自定义过滤器*/
app.filter('capitalize', function () {
    return function (input) {
        if (input) {
            var ss = input[0].toUpperCase() + input.slice(1);
            return ss;
        }
    }
});

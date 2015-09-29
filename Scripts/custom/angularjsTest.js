/// <reference path="../libs/Angular/angular.min.js" />
//InvoiceCntl();
var app = angular.module('myApp', []);
app.controller('myContrller', function ($scope, $http) {
    $scope.message = 'Hello ,Angular JS';
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
    $scope.save = function () {
        if ($scope.form.$valid) {
            $http({
                method: 'POST',
                url: '/Shop/FormSubmit',
                data:$scope.formData,
                //data: JSON.stringify($scope.formData),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

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
/**
 * Created by ThaiSon on 01/12/2016.
 */

define(function (require) {
    'use strict';

    var email = angular.module('emailLogin', []);

    email.controller('emailLogin', function ($http, store, $scope, $state) {
        $scope.user = {};
        $scope.login = function () {
            $http({
                method: 'POST',
                url: 'http://localhost:59219/api/Account/signin',
                data: $scope.user
            }).then(function successCallback(response) {
                store.set('jwt', response.data);
                console.log(response);
                if(response.data.dbUser.name == "1312009")
                    $state.go("admin");
                else
                    window.location.replace('http://localhost:3000');
                // $state.go("/");
            }, function errorCallback(response) {
                console.log(response);
                console.log($scope.user);
            });
        };
    });

    return email;

});
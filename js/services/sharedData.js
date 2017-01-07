/**
 * Created by ThaiSon on 06/12/2016.
 */

define(function (require) {
    'use strict';

    var sharedDT = angular.module('sharedData', []);

    sharedDT.factory("sharedData", [
        function(){
            var data = {
                listFood: '',
                meals: ["selected","",""],
                forgetPass: false,
                host: "https://cloudappharboraspnet.apphb.com",
                domain: "https://thaison95.github.io"
            };
            return data;
        }]);

    return sharedDT;

});
/**
 * Created by ThaiSon on 06/12/2016.
 */

define(['require',
    './sharedData'], function (require) {

    "use strict";

    var sharedDT = require('./sharedData');

    var services = angular.module('services',['sharedData']);

    return services;
});
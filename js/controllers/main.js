/**
 * Created by ThaiSon on 30/11/2016.
 */

define(['require',
    './login/social',
    './home',
    './menu',
    './reservation',
    './contact',
    './email',
    './admin',
    './payment',
    './login/getToken'], function (require) {

    "use strict";

    var social = require('./login/social');
    var home = require('./home');
    var menu = require('./menu');
    var reservation = require('./reservation');
    var contact = require('./contact');
    var email = require('./email');
    var admin = require('./admin');
    var payment = require('./payment');
    var getToken = require('./login/getToken');

    var controllers = angular.module('controllers',['socialLogin','home','emailLogin','getToken','menu','reservation','contact','admin','payment']);

    return controllers;
});
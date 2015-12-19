/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ui.router',
                         'ngResource',
                         'ngAnimate',
                         'toastr',
                         'myApp.services',
                         'myApp.interceptors',
                         'myApp.controllers'])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('plans', {
        url: "/",
        templateUrl: 'templates/plans-index.html',
        controller: 'PlansIndexCtrl'
      });

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  });

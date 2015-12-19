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
      .state('posts', {
        url: "/",
        templateUrl: 'templates/cities-index.html',
        controller: 'CitiesIndexCtrl'
      })

      .state('city', {
        url: "/cities/:cityName",
        templateUrl: 'templates/cities-show.html',
        controller: 'CitiesShowCtrl'
      })

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  });

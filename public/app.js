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
      .state("cities-index", {
        url: "/",
        templateUrl: 'templates/cities-index.html',
        controller: 'CitiesIndexCtrl'
      })

      .state('city', {
        url: "/cities/:cityName",
        templateUrl: 'templates/cities-show.html',
        controller: 'CitiesShowCtrl'
      })

      .state('plans-new', {
        url: "/plans/new",
        templateUrl: 'templates/plans-new.html',
        controller: 'PlansNewCtrl'
      })

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  });

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
      .state('plans-index', {
        url: "/",
        templateUrl: "templates/plans-index.html",
        controller: 'PlansIndexCtrl'
      })
      .state('plans-new', {
        url: "/plans/new",
        templateUrl: 'templates/plans-new.html',
        controller: 'PlansNewCtrl'
      })
      .state("plans-show", {
        url: "plans/:id",
        template: "THIS IS THE PLAN SHOW PAGE"
      })

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  });

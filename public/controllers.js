/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', function ($http, $rootScope, $scope, toastr) {
    // INITIALIZATION AND NAVBAR LOGIC

    function getCurrentUser () {
      $http.get('https://api.parse.com/1/users/me')
        .success(function(data) {
          $rootScope.currentUser = data;
          localStorage.setItem("currentUser", JSON.stringify(data));
        })
        .error(function(data) {
          toastr.error(data.error, 'Error');
        })
    }

    console.log(localStorage.getItem('sessionToken'))
    if (localStorage.getItem('sessionToken')) {
      getCurrentUser();
      toastr.success('Welcome Back!', 'Success');
    }

    $scope.user = {};

    $scope.signup = function() {
      console.log($scope.user)
      $http.post('https://api.parse.com/1/users', $scope.user)
        .success(function(data) {
          toastr.success('You signed up', 'Success');
          console.log(data);
          $scope.user = {};
          localStorage.setItem('sessionToken', data.sessionToken);
          getCurrentUser();
        })
        .error(function(data) {
          toastr.error(data.error + ". Please try again.", 'Error');
        })
    }

    function transformRequest (obj) {
      var str = [];
      for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    }

    $scope.login = function() {
      var user = transformRequest($scope.user);

      $http.get('https://api.parse.com/1/login?' + user).success(function(data) {
        toastr.success('You logged in', 'Success');
        $scope.user = {};
        localStorage.setItem('sessionToken', data.sessionToken);
        getCurrentUser();
      }).error(function(data) {
        toastr.error(data.error + ". Please try again.", 'Error');
      });
    }

    $scope.logout = function() {
      $http.post('https://api.parse.com/1/logout')
        .success(function(data) {
          toastr.success('You logged out', 'Success');
          localStorage.removeItem('sessionToken')
          $scope.currentUser = null;
        })
        .error(function(data) {
          toastr.error(data.error + ". Please try again.", 'Error');
        })
    }


  })

  //POSTS
  .controller('PlansIndexCtrl', function ($rootScope, $scope, $http, Plan) {
    // GET POSTS
    Plan.query(function(data) {
      $scope.plans = data.results;
    });


    // CREATE PLAN
    $scope.createPlan = function() {
      var user = JSON.parse(localStorage.getItem("currentUser"));
      console.log(user)
      var plan = new Plan($scope.plan);
      plan.author = user.id;
      plan.$save(function(data) {
        Plan.get({ id: data.objectId }, function(plan) {
          $scope.plans.unshift(plan);
          $scope.plan = {};
        })
      })
    };

    // DELETE A PLAN
    $scope.deletePlan = function(plan, index) {
      Plan.delete({ id: plan.objectId }, function(data) {
        $scope.plans.splice(index, 1);
      })
    }
  });
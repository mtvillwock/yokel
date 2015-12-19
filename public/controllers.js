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
          localStorage.removeItem('sessionToken')
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

  //PLANS

  .controller('PlansIndexCtrl', function() {
    console.log("PlansIndexCtrl loaded")
  })

  .controller('PlansNewCtrl', function ($scope, $http, Plan) {
    // GET POSTS
    Plan.query(function(data) {
      $scope.plans = data.results;
    });


    // CREATE PLAN
    $scope.createPlan = function() {
      var user = JSON.parse(localStorage.getItem("currentUser"));
      console.log("current user: ", user)
      // // {"opponents":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Player","objectId":"Vx4nudeWn"}]}}
      var pointer = {"plans":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"_User","objectId": user.objectId}]}}
      $scope.plan.author = pointer;
      console.log("plan data is: ", $scope.plan)
      var plan = new Plan($scope.plan);
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
  })

  .controller('CitiesIndexCtrl', function ($scope) {
    $scope.cities = ['San Francisco', 'New York City', 'Los Angeles', 'Chicago', 'Austin']
  })

  .controller('CitiesShowCtrl', function ($scope, $routeParams, Plan) {
       $scope.cityName = $routeParams.cityName;
    $scope.plans = Plan.find({ city: $routeParams.cityName });
  })
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

  //POSTS
  .controller('PostsIndexCtrl', function ($scope, $http, Post) {
    // GET POSTS
    Post.query(function(data) {
      $scope.posts = data.results;
    });
    

    // CREATE POST
    $scope.createPost = function() {   
      var post = new Post($scope.post);
      post.$save(function(data) {
        Post.get({ id: data.objectId }, function(post) {
          $scope.posts.unshift(post);
          $scope.post = {};
        })
      })
    }; 

    // DELETE A POST
    $scope.deletePost = function(post, index) {
      Post.delete({ id: post.objectId }, function(data) {
        $scope.posts.splice(index, 1);
      })
    }
  })

  .controller('CitiesIndexCtrl', function ($scope) {
    $scope.cities = ['San Francisco', 'New York City', 'Los Angeles', 'Chicago', 'Austin']
  })

  // .controller('CitiesShowCtrl', function ($scope, $routeParams, Plan) {
       // $scope.cityName = $routeParams.cityName;
  //   $scope.plans = Plan.find({ city: $routeParams.cityName });
  // })
/*
 * INTERCEPTORS
 */

'use strict';

var app = angular.module('myApp.interceptors', []);

app.factory('parseInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers['X-Parse-Application-Id'] = 'HRtnGU3AUfDeA9GhQfPzY6qDvG7wEjILO4TTK2AH';
      config.headers['X-Parse-REST-API-Key'] = 'FVuQU8wncnzB1KySdoL9uzZUtXSZu1D4rzNtpnpL';

      // ADD SESSION TOKEN TO REQUESTS
      if (localStorage.getItem('sessionToken')) {
        config.headers['X-Parse-Session-Token'] = localStorage.getItem('sessionToken')
      }

      return config;
    },
    response: function (response) {
      return response || $q.when(response);
    }
  };
})

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('parseInterceptor');
});
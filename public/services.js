/*
 * SERVICES
 */


'use strict';

var app = angular.module('myApp.services', []);

app.factory('Plan', function ($resource) {
  var url = "https://api.parse.com/1";
  return $resource(url + '/classes/Plan/:id', {id:'@id'}, {
    query: { isArray: false }
  }, {
    update: { method:'PUT' }
  });
});
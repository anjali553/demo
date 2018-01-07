'use strict';

angular.module('doiApp')
    .controller('UomDetailController', function ($scope, $stateParams, Uom, Parameter_master) {
        $scope.uom = {};
        $scope.load = function (id) {
            Uom.get({id: id}, function(result) {
              $scope.uom = result;
            });
        };
        $scope.load($stateParams.id);
    });

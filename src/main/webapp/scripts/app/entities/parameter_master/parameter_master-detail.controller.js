'use strict';

angular.module('doiApp')
    .controller('Parameter_masterDetailController', function ($scope, $rootScope, $stateParams, entity, Parameter_master) {
        $scope.parameter_master = entity;
        $scope.load = function (id) {
            Parameter_master.get({id: id}, function(result) {
                $scope.parameter_master = result;
            });
        };
        $rootScope.$on('doiApp:parameter_masterUpdate', function(event, result) {
            $scope.parameter_master = result;
        });
    });

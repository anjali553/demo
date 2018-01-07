'use strict';

angular.module('doiApp')
    .controller('Propellant_type_masterDetailController', function ($scope, $stateParams, Propellant_type_master) {
        $scope.propellant_type_master = {};
        $scope.load = function (id) {
            Propellant_type_master.get({id: id}, function(result) {
              $scope.propellant_type_master = result;
            });
        };
        $scope.load($stateParams.id);
    });

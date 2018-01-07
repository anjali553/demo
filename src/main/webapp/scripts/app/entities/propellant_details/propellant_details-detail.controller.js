'use strict';

angular.module('doiApp')
    .controller('Propellant_detailsDetailController', function ($scope, $stateParams, Propellant_details, Test_batch, Propellant_type_master, Uom) {
        $scope.propellant_details = {};
        $scope.load = function (id) {
            Propellant_details.get({id: id}, function(result) {
              $scope.propellant_details = result;
            });
        };
        $scope.load($stateParams.id);
    });

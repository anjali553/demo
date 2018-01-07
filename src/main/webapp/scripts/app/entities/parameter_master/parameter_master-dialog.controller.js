'use strict';

angular.module('doiApp').controller('Parameter_masterDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Parameter_master',
        function($scope, $stateParams, $modalInstance, entity, Parameter_master) {

        $scope.parameter_master = entity;
        $scope.load = function(id) {
            Parameter_master.get({id : id}, function(result) {
                $scope.parameter_master = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('doiApp:parameter_masterUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.parameter_master.id != null) {
                Parameter_master.update($scope.parameter_master, onSaveFinished);
            } else {
                Parameter_master.save($scope.parameter_master, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);

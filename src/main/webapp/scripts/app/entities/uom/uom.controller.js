'use strict';

angular.module('doiApp')
    .controller('UomController', function ($scope, Uom, Parameter_master, ParseLinks) {
        $scope.uoms = [];
        $scope.parameter_masters = Parameter_master.query();
        $scope.page = 1;
        $scope.loadAll = function() {
            Uom.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.uoms.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.uoms = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.showUpdate = function (id) {
            Uom.get({id: id}, function(result) {
                $scope.uom = result;
                //$('#saveUomModal').modal('show');
                $('#viewUomModal').modal('hide');
            });
        };

        $scope.save = function () {
            if ($scope.uom.id != null) {
                Uom.update($scope.uom,
                    function () {
                		$rootScope.alerts.push({type: 'success',msg: 'Updated successfully!'});
                        $scope.refresh();
                    });
            } else {
                Uom.save($scope.uom,
                    function () {
                		$rootScope.alerts.push({type: 'success',msg: 'Saved successfully!'});
                		$('#saveUomModal').modal('hide');
                        //$scope.refresh();
                    });
            }
        };

        $scope.delete = function (id) {
            Uom.get({id: id}, function(result) {
                $scope.uom = result;
                $('#viewUomModal').modal('hide');
                $('#deleteUomConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Uom.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteUomConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $('#saveUomModal').modal('hide');
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.uom = {value: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
        
        // to view in pop up 
        $scope.viewAll = function() {
        	$scope.scrollDisabled = false;

       	 $('#viewUomModal').modal('show');
       	 $scope.uoms = [];
           Uom.query({page: 1, per_page: 20}, function(result, headers) {
               $scope.links = ParseLinks.parse(headers('link'));
               for (var i = 0; i < result.length; i++) {
                   $scope.uoms.push(result[i]);
               };
           });
       };
        
    });

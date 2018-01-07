'use strict';

angular.module('doiApp')
    .controller('Propellant_type_masterController', function ($scope, $state, $stateParams, Propellant_type_master, ParseLinks) {
        $scope.propellant_type_masters = [];
        $scope.requisitionId = '';
        $scope.testBatchId = '';
        $scope.page = 1;
        $scope.loadAll = function() {
            Propellant_type_master.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.propellant_type_masters.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.propellant_type_masters = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        
        $scope.goBack = function() {
        	
        	$state.go('propellant_detailsWithTestBatch',{requisitionId:$scope.requisitionId, testBatchId:$scope.testBatchId});
        }
        
       
        if($scope.requisitionId === '' && $stateParams.requisitionId !== '')
    	{
    		$scope.requisitionId = $stateParams.requisitionId;
    		console.log("This is requisition id:" +$scope.requisitionId);
    	}
    	
    	if($scope.testBatchId === '' && $stateParams.testBatchId !== '')
    	{
	        	$scope.testBatchId = $stateParams.testBatchId;
	        	console.log("This is the testBatchId:" + $scope.testBatchId);
    	}
    	
    	$scope.init = function()
    	{
	        $scope.propellant_type_master = {};
	        $scope.propellant_type_master.requisition = {};
	        $scope.propellant_type_master.requisition.id = $scope.requisitionId;
	    	$scope.propellant_type_master.test_batch = {};
	    	$scope.propellant_type_master.test_batch.id = $scope.testBatchId;
    	}
    	
    	$scope.init();
        $scope.loadAll();

        $scope.showUpdate = function (id) {
            Propellant_type_master.get({id: id}, function(result) {
                $scope.propellant_type_master = result;
                $('#viewPropellant_type_masterModal').modal('hide');
            });
        };

        $scope.save = function () {
            if ($scope.propellant_type_master.id != null) {
                Propellant_type_master.update($scope.propellant_type_master,
                    function () {
                        $scope.refresh();
                    });
            } else {
                Propellant_type_master.save($scope.propellant_type_master,
                    function () {
                        $scope.refresh();
                    });
            }
        };

        $scope.delete = function (id) {
            Propellant_type_master.get({id: id}, function(result) {
                $scope.propellant_type_master = result;
                $('#viewPropellant_type_masterModal').modal('hide');
                $('#deletePropellant_type_masterConfirmation').modal('show');
                $scope.clear();
            });
        };

        $scope.confirmDelete = function (id) {
            Propellant_type_master.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deletePropellant_type_masterConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $('#savePropellant_type_masterModal').modal('hide');
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.propellant_type_master = {propellant_name: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
        
        // to view in pop up
        $scope.viewAll = function() {
        	$scope.scrollDisabled = false;
        	 $('#viewPropellant_type_masterModal').modal('show');
       	$scope.propellant_type_masters = [];
       	Propellant_type_master.query({page: 1, per_page: 20}, function(result, headers) {
               $scope.links = ParseLinks.parse(headers('link'));
               for (var i = 0; i < result.length; i++) {
                   $scope.propellant_type_masters.push(result[i]);
               };
           });
       };
        
    });
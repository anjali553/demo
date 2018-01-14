'use strict';

angular.module('demoApp')
	.controller('Propellant_detailsController', function($scope, Links){
	
	$scope.propellant_detailss = [];
    $scope.test_batchs = Test_batch.query();
    //$scope.propellant_type_masters = Propellant_type_master.query();
    $scope.uoms = Uom.query();
    $scope.page = 1;
    
    $scope.testBatchId = '';
    //$scope.requisitionId = '';
    $scope.test_batch = {};
    $scope.scrollDisabled = true;
    $scope.propellant_type_master = '';
    
    
    $scope.goBack = function() {
    	if($scope.requisitionId == null || $scope.requisitionId.toString() == '')
    		$state.go('home');
    	else
    		$state.go('requisitionDetailWithBatch',{id:$scope.requisitionId, testBatch:$scope.testBatchId});
    };
    
    //to view in pop-up
    $scope.viewAll = function() {
    	$scope.scrollDisabled = false;

   	 $('#viewPropellant_detailsModal').modal('show');
   	 $scope.propellant_detailss = [];
       Propellant_details.query({page: 1, per_page: 20,
    	   testBatchId : $scope.testBatchId}, function(result, headers) {
           $scope.links = ParseLinks.parse(headers('link'));
           for (var i = 0; i < result.length; i++) {
               $scope.propellant_detailss.push(result[i]);
           };
       });
   };
    
    
});
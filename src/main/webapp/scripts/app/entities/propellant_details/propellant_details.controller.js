'use strict';

angular.module('doiApp')
    .controller('Propellant_detailsController', function ($scope, $state, $rootScope, $stateParams, Propellant_details, Test_batch, Account, User, Uom,Propellant_detailsService, Links, ParseLinks, $location) {
        $scope.propellant_detailss = [];
        $scope.test_batchs = Test_batch.query();
        //$scope.propellant_type_masters = Propellant_type_master.query();
        $scope.uoms = Uom.query();
        $scope.page = 1;
        
        $scope.testBatchId = '';
        $scope.requisitionId = '';
        $scope.test_batch = {};
        $scope.scrollDisabled = true;
        $scope.propellant_type_master = '';
        
        $scope.goBack = function() {
        	if($scope.requisitionId == null || $scope.requisitionId.toString() == '')
        		$state.go('home');
        	else
        		$state.go('requisitionDetailWithBatch',{id:$scope.requisitionId, testBatch:$scope.testBatchId});
        };
        
        
        $scope.loadAll = function() {
           /* Propellant_details.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.propellant_detailss.push(result[i]);
                }
            });*/
        	
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.propellant_detailss = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        
        if($scope.requisitionId === '' && $stateParams.requisitionId !== '')
    	{
    		$scope.requisitionId = $stateParams.requisitionId;
    	}
    	
    	if($scope.testBatchId === '' && $stateParams.testBatchId !== '')
    	{
	        	$scope.testBatchId = $stateParams.testBatchId;
	        	console.log("This is the testBatchId:" + $scope.testBatchId);
    	}

    	
    	$scope.init = function()
    	{
	        $scope.propellant_details = {};
	        $scope.propellant_details.requisition = {};
	        $scope.propellant_details.requisition.id = $scope.requisitionId;
	    	$scope.propellant_details.test_batch = {};
	    	$scope.propellant_details.test_batch.id = $scope.testBatchId;
	    	$scope.propellant_details.weight_uom = {};
	    	$scope.propellant_details.weight_uom.id=17;
    	}
    	
    	$scope.init();
        $scope.loadAll();

        $scope.showUpdate = function (id) {
            Propellant_details.get({id: id}, function(result) {
                $scope.propellant_details = result;
                //$('#savePropellant_detailsModal').modal('show');
                $('#viewPropellant_detailsModal').modal('hide');
            });
        };
        
        //To get testBatch data
        
        $scope.getTestBatchData = function(testId){
            
        	Test_batch.get({id: testId}, function(result){        	 	
        	   $scope.testbatchesresult = result;	
        	});
        };
        
    	$scope.getTestBatchData($stateParams.testBatchId);
        
        
        
        
        

        $scope.save = function () {
        	$scope.propellant_details.test_batch = {};
	    	$scope.propellant_details.test_batch.id = $scope.testBatchId;
            if ($scope.propellant_details.id != null) {
                Propellant_details.update($scope.propellant_details,
                    function () {
                		$rootScope.alerts.push({type: 'success',msg: 'Updated successfully!'});
                        $scope.refresh();
                    });
            } else {
                Propellant_details.save($scope.propellant_details,
                    function () {
                		$rootScope.alerts.push({type: 'success',msg: 'Saved successfully!'});
                    	$('#savePropellant_detailsModal').modal('hide');
                    	$scope.refresh();
                    });
            }
        };

        $scope.delete = function (id) {
            Propellant_details.get({id: id}, function(result) {
                $scope.propellant_details = result;
                $('#viewPropellant_detailsModal').modal('hide');
                $('#deletePropellant_detailsConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Propellant_details.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deletePropellant_detailsConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $('#savePropellant_detailsModal').modal('hide');
            $scope.clear();
            $scope.init();
        };

        $scope.clear = function () {
            $scope.propellant_details = {propellant_type : null, weight: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
        
        // to view in pop up 
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
   //    $scope.viewAll();
       // TO get the user account id
		
		
		Account.get(function(result) {
          $scope.account = result.data;            
          User.get({login:$scope.account.login}, function(result) {
				$scope.user = result;
				console.log("here is test batch user id:"+$scope.user.id);
			//	$scope.clonePropellantDetails();
			});
      });
		
		// Clone
		
		/*$scope.clonePropellantDetails = function(){
			console.log("here is the user:"+$scope.user.id);
			Propellant_detailsService.getPreviousPropellantDetails($scope.user.id,$stateParams.testBatchId).then(function(result){
				if(result.id != null){
	    		   result.id = null;
	    		   $scope.propellant_details = result;
				}
	    	   });
		};*/
		
		//to get testBatch count
        $scope.testBatchCountDTO = Test_batch.getTestBatchCount({requisitionId:$stateParams.requisitionId,testBatchId:$stateParams.testBatchId });  
       
    });

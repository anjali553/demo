'use strict';

angular.module('doiApp')
    .controller('Test_batchController', function ($scope, $state, $rootScope, $stateParams, Test_batchService, DateUtils, Test_batch, Requisition,Account, Uom, User, ParseLinks, Links, $location, UploadUtil) {
        $scope.test_batchs = [];
        // $scope.requisitions = Requisition.query();
        $scope.requisition = {};
        $scope.uoms = Uom.query();
        $scope.page = 1;
        $scope.opened = {};
        $scope.opened.openedStart = false;
        $scope.opened.openedEnd = false;
        $scope.requisitionId = '';
        $scope.testBatchId = '';
        $scope.scrollDisabled = true;
        $scope.saveDisabled = true;
        $scope.noOfTestsDisabled = false;

        $scope.clonereqid = $stateParams.clonereqid;
        
        $scope.minDate = new Date();
        
        $scope.open = function($event,datepicker) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened[datepicker] = true;
        };
        
        $scope.clearTemp = function(){
        	$scope.test_batch.non_ambient_temperature = null;
        	  	
        };
              
        $scope.init = function(){
        	$scope.test_batch = {};
        	$scope.test_batch.is_ambient = true;
        	$scope.test_batch.data_acquisition = true;
        	$scope.test_batch.video_acquisition = true;
        	$scope.test_batch.burning_time_uom = {};
        	$scope.test_batch.burning_time_uom.id = 7;
        	$scope.test_batch.non_ambient_temperature_uom = {};
        	$scope.test_batch.non_ambient_temperature_uom.id = 3;
       };               
       $scope.init();       
       
       $scope.goBack = function() {
        	if($scope.requisitionId == null || $scope.requisitionId.toString() == '')
        		$state.go('home');
        	else if($scope.newTestBatchId === '')
        		$state.go('requisitionDetail',{id:$scope.requisitionId,clonereqid:$stateParams.clonereqid});
        	else
        		$state.go('requisitionDetailWithBatch',{id:$scope.requisitionId,testBatch:$scope.newTestBatchId});
        };
       
        $scope.viewAll = function() {
        	$scope.scrollDisabled = false;
        	 $('#viewTest_batchModal').modal('show');
        	 $scope.test_batchs = [];
            Test_batch.query({page: 1, per_page: 20,requisitionId:$scope.requisitionId}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.test_batchs.push(result[i]);
                }
            });
        };
       
      //  $scope.viewAll();
        $scope.test_batchess = [];
        $scope.viewTestBatchDetails = function(){     
        	console.log("requiId:"+$stateParams.requisitionId);
        	Test_batch.query({page: 1, per_page: 20,requisitionId:$stateParams.requisitionId}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.test_batchess.push(result[i]);
                }
                if($scope.test_batchess.length>0){
                	$('#viewTest_batchModalTestBatch').modal('show');
                }
            });
        };
        
      //  $scope.viewTestBatchDetails();
        
        $scope.loadAll = function(requisitionId) {
        	console.log("This is the requisition id:" + $scope.requisitionId);
            Test_batch.query({page: $scope.page, per_page: 20, requisitionId:$scope.requisitionId}, function(result, headers) {
                for (var i = 0; i < result.length; i++) {
                    $scope.test_batchs.push(result[i]);
                }
                
                var no_of_tests_in_requisition = $scope.requisition.no_of_tests_planned;
            	var no_of_tests_in_batches = 0;
            	for (var i = 0; i < $scope.test_batchs.length; i++) {
            		no_of_tests_in_batches += $scope.test_batchs[i].no_of_tests_in_batch;
            	}
            	
            	console.log("$scope.test_batchs.length === $scope.requisition.no_of_test_batches");
            	console.log($scope.test_batchs.length + "===" + $scope.requisition.no_of_test_batches);
            	if($scope.test_batchs.length + 1 === $scope.requisition.no_of_test_batches){
            		$scope.test_batch.no_of_tests_in_batch  = no_of_tests_in_requisition - no_of_tests_in_batches;
            		$scope.noOfTestsDisabled = true;
            		$scope.saveDisabled = false;
            	}
            });
        };
        
        $scope.reset = function() {
            $scope.page = 1;
            $scope.test_batchs = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        
             
        $scope.requisitionId = $stateParams.requisitionId;
        $scope.test_batch = {};
    	$scope.test_batch.requisition = {};
    	$scope.test_batch.requisition.id = $scope.requisitionId;
    	
		Requisition.get({
			id : $scope.requisitionId
		}, function(result) {
			$scope.requisition = result;
			console.log("Requisition:" + JSON.stringify($scope.requisition));
		    $scope.loadAll($stateParams.requisitionId);
		});
    	
 
        $scope.showUpdate = function (id) {
            Test_batch.get({id: id}, function(result) {
                $scope.test_batch = result;
                // $('#saveTest_batchModal').modal('show');
                $scope.validation();
                $('#viewTest_batchModal').modal('hide');
            });
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.validation = function(){
        	$scope.saveDisabled = true;
        	
        	if($scope.test_batch.no_of_tests_in_batch <= 0)
        		return false;
        	
        	var no_of_tests_in_requisition = $scope.requisition.no_of_tests_planned;
        	var no_of_tests_in_batches = 0;
        	for (var i = 0; i < $scope.test_batchs.length; i++) {
        		no_of_tests_in_batches += $scope.test_batchs[i].no_of_tests_in_batch;
        	}
        	
        	var no_of_batches_remaining =  $scope.requisition.no_of_test_batches - $scope.test_batchs.length;
        	var no_of_tests_remaining = no_of_tests_in_requisition - no_of_tests_in_batches;
        	
        	console.log("No of batches remaining:" + no_of_batches_remaining);
        	console.log("No of tests remaining:" + no_of_tests_remaining);
        	console.log("No of tests in current batch:" + $scope.test_batch.no_of_tests_in_batch);
        	
        	console.log("$scope.test_batch.no_of_tests_in_batch + no_of_batches_remaining  > no_of_tests_remaining + 1");
        	console.log($scope.test_batch.no_of_tests_in_batch +"+"+ no_of_batches_remaining +"  >  " + no_of_tests_remaining + 1);
        	$scope.allowedTest ='';
        	if(no_of_tests_remaining === no_of_batches_remaining)
        	{
        			console.log("Forcing to 1");
	        		$scope.test_batch.no_of_tests_in_batch = 1;
        	} else if(parseInt($scope.test_batch.no_of_tests_in_batch,10) + no_of_batches_remaining  > no_of_tests_remaining + 1 )
            {
        			console.log("Not allowed:" + $scope.test_batch.no_of_tests_in_batch);
        			$scope.allowedTest = "Not allowed:";
    	        	return false;
            } 
			console.log("Allowed:" + $scope.test_batch.no_of_tests_in_batch);			        	
        	$scope.saveDisabled = false;
        	return true;
        };
        
        $scope.validTemp = function(){
        	if($scope.test_batch.is_ambient === true && $scope.test_batch.non_ambient_temperature == '' == true ){
        		$scope.saveDisabled = true;        		
        	}
        	else{       	
        		$scope.saveDisabled = false;
        	}        	
        };

          $scope.save = function () {
        	 $scope.testBatchId = $scope.test_batch.id;
            if ($scope.test_batch.id != null) {
                Test_batch.update($scope.test_batch,
                    function () {
                		$rootScope.alerts.push({type: 'success',msg: 'Updated successfully!'});
                		$state.go('test_parameterForTestBatch',{testBatchId: $scope.testBatchId, requisitionId: $stateParams.requisitionId });
                        $scope.refresh();
                    });
            } else {
            	$scope.test_batch.requisition = {};
            	$scope.test_batch.requisition.id = $scope.requisitionId;
                Test_batch.save($scope.test_batch,
                    function (value,headers) {
	            		var location = headers().location;
	            		$scope.testBatchId = location.substring(location.lastIndexOf("/")+1);
	            		$rootScope.alerts.push({type: 'success',msg: 'Saved successfully!'});
	            		if($scope.test_batch.data_acquisition == true && $scope.test_batch.video_acquisition == true ){
	            		$state.go('test_parameterForTestBatch',{testBatchId: $scope.testBatchId, requisitionId: $stateParams.requisitionId });
	            		 $scope.refresh();
	            		}
	            		if($scope.test_batch.video_acquisition == true && $scope.test_batch.data_acquisition == false){
	            		$state.go('normal_video_detailsForTestBatch',{testBatchId: $scope.testBatchId,requisitionId: $stateParams.requisitionId });	            			
	            		 $scope.refresh();
	            		}
	            		if($scope.test_batch.video_acquisition == false && $scope.test_batch.data_acquisition == false){
	            		$state.go('data_presentation_requirementsForTestBatch',{testBatchId:$scope.testBatchId,requisitionId:$stateParams.requisitionId});	
	            		 $scope.refresh();
	            		}
	            		if($scope.test_batch.data_acquisition == true && $scope.test_batch.video_acquisition == false){
	            		$state.go('test_parameterForTestBatch',{testBatchId: $scope.testBatchId, requisitionId: $stateParams.requisitionId });	
	            		 $scope.refresh();
	            		}
	            		 
	            		/*Test_batch.query({page: 1, per_page: 20,requisitionId:$scope.requisitionId}, function(result, headers) {
	                        $scope.links = ParseLinks.parse(headers('link'));
	                        $scope.test_batchs = [];
	                        for (var i = 0; i < result.length; i++) {
	                            $scope.test_batchs.push(result[i]);
	                        }
	                    });*/	            		
                    });                   
              }
         //   $scope.refresh();
        };
        
        $scope.delete = function (id) {
        	$('#viewTest_batchModal').modal('hide');
            Test_batch.get({id: id}, function(result) {
                $scope.test_batch = result;
                $('#deleteTest_batchConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Test_batch.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteTest_batchConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $('#saveTest_batchModal').modal('hide');
            $scope.clear();
            $scope.init();
            
        };

        $scope.clear = function () {
            $scope.test_batch = {test_date: null, test_condition: null, calibration_criteria: null, expected_test_outcome: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();

        };

        $scope.$watch('test_batch.sensor_layout1', function (files) {
            $scope.formUpload = false;
            if (files != null) {
                for (var i = 0; i < files.length; i++) {
                    $scope.errorMsg = null;
                    (function (file) {
                    	UploadUtil.uploadUsingUpload(file, $scope, 'testBatch_sensorLayout');
                    })(files[i]);
                }
            }
        });

        $scope.$watch('test_batch.predicted_data1', function (files) {
            $scope.formUpload = false;
            if (files != null) {
                for (var i = 0; i < files.length; i++) {
                    $scope.errorMsg = null;
                    (function (file) {
                    	UploadUtil.uploadUsingUpload(file, $scope, 'testBatch_predicted_data');
                    })(files[i]);
                }
            }
        });

		$scope.getReqParams = function() {
			return $scope.generateErrorOnServer ? '?errorCode='
					+ $scope.serverErrorCode + '&errorMessage='
					+ $scope.serverErrorMsg : '';
		};
		
		
		// TO get the user account id
		
		
		Account.get(function(result) {
            $scope.account = result.data;            
            User.get({login:$scope.account.login}, function(result) {
				$scope.user = result;
				console.log("here is test batch user id:"+$scope.user.id);
				//$scope.cloneTestBatch();
			});
        });
		
		
		// Clone
		
		$scope.cloneTestBatch = function(){
		//	console.log("here is the user:"+$scope.user.id);
			console.log("here is the req:"+$stateParams.requisitionId);			
			Test_batchService.getPreviousTestBatch($stateParams.clonereqid,$stateParams.requisitionId).then(function(result){
				if(result.id != null){
					 result.id = null;
		    		 $scope.test_batch = result;
				}
					    		  
	    	   });
		};
		
	//	$scope.cloneTestBatch();
		
		//for datetime picker
/*		 $(function () {
             $('#datetimepicker1').datetimepicker();
         });*/
    });

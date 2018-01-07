'use strict';

angular.module('doiApp').controller(
		'Test_batchDetailController',
		function($scope, $stateParams, Test_batch, Test_parameter,
				Test_parameter_details, Squib_details, Propellant_details,
				Motor_details, Video_details, Tarb_details, User_trial_team_details, Gid_trial_team_details, View_trail_team_details, 
				Photography_details, Data_presentation_requirements) {
			$scope.oneAtATime = true;
			$scope.test_batch = {};
			$scope.test_parameters = [];
			//$scope.test_parameter_detailss = [];
			$scope.test_parameter_details = [];
			$scope.squib_detailss = [];
			$scope.propellant_detailss = [];
			$scope.motor_detailss = [];
			$scope.video_detailss = [];
			$scope.tarb_detailss = [];
			$scope.user_trial_team_detailss = [];
			$scope.gid_trial_team_detailss = [];
			$scope.view_trail_team_detailss = [];
			$scope.photography_detailss = [];
			$scope.data_presentation_requirementss = [];
			
			$scope.status = {
				isFirstOpen : false,
				isFirstDisabled : false
			};
			$scope.load = function(id) {

				Test_batch.get({
					id : id
				}, function(result) {
					$scope.test_batch = result;
				});

				Test_parameter.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.test_parameters.push(result[i]);
					}
				});

				/*Test_parameter_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.test_parameter_detailss.push(result[i]);
					}
				});*/
				
				Test_parameter_detail.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.test_parameter_details.push(result[i]);
					}
				});

				Squib_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.squib_detailss.push(result[i]);
					}
				});

				Propellant_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.propellant_detailss.push(result[i]);
					}
				});

				Motor_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.motor_detailss.push(result[i]);
					}
				});

				Video_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.video_detailss.push(result[i]);
					}
				});

				Tarb_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.tarb_detailss.push(result[i]);
					}
				});
				
				User_trial_team_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.user_trial_team_detailss.push(result[i]);
					}
				});
				
				Gid_trial_team_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.gid_trial_team_detailss.push(result[i]);
					}
				});
				

				View_trail_team_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.view_trail_team_detailss.push(result[i]);
					}
				});
				
				Photography_details.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.photography_detailss.push(result[i]);
					}
				});
				Data_presentation_requirements.query({
					page : $scope.page,
					per_page : 20,
					testBatchId : id
				}, function(result, headers) {
					for (var i = 0; i < result.length; i++) {
						$scope.data_presentation_requirementss.push(result[i]);
					}
				});
			};
			$scope.load($stateParams.id);
		});


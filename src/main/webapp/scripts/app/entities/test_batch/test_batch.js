'use strict';

angular
		.module('doiApp')
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									'test_batch',
									{
										parent : 'entity',
										url : '/test_batch',
										data : {
											roles : [ 'ROLE_USER' ],
											pageTitle : 'Test_batchs'
										},
										views : {
											'content@' : {
												templateUrl : 'scripts/app/entities/test_batch/test_batchs.html',
												controller : 'Test_batchController'
											}
										},
										resolve : {}
									})
							.state(
									'test_batchDetail',
									{
										parent : 'entity',
										url : '/test_batch/:id',
										data : {
											roles : [ 'ROLE_USER' ],
											pageTitle : 'Test_batch'
										},
										views : {
											'content@' : {
												templateUrl : 'scripts/app/entities/test_batch/test_batch-detail.html',
												controller : 'Test_batchDetailController'
											}
										},
										resolve : {}
									})
							.state(
									'test_batchForRequisition',
									{
										parent : 'entity',
										url : '/test_batch/forRequisition/:requisitionId',
										data : {
											roles : [ 'ROLE_USER' ],
											pageTitle : 'Test_batch'
										},
										views : {
											'content@' : {
												templateUrl : 'scripts/app/entities/test_batch/test_batchs.html',
												controller : 'Test_batchController'
											}
										},
										resolve : {}
									});
				});

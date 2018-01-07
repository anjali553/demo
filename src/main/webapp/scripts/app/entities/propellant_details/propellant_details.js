'use strict';

angular
		.module('doiApp')
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									'propellant_details',
									{
										parent : 'entity',
										url : '/propellant_details',
										data : {
											roles : [ 'ROLE_USER' ],
											pageTitle : 'Propellant_detailss'
										},
										views : {
											'content@' : {
												templateUrl : 'scripts/app/entities/propellant_details/propellant_detailss.html',
												controller : 'Propellant_detailsController'
											}
										},
										resolve : {}
									})
							.state(
									'propellant_detailsDetail',
									{
										parent : 'entity',
										url : '/propellant_details/:id',
										data : {
											roles : [ 'ROLE_USER' ],
											pageTitle : 'Propellant_details'
										},
										views : {
											'content@' : {
												templateUrl : 'scripts/app/entities/propellant_details/propellant_details-detail.html',
												controller : 'Propellant_detailsDetailController'
											}
										},
										resolve : {}
									})
							.state(
									'propellant_detailsForTestBatch',
									{
										parent : 'entity',
										url : '/propellant_details/forTestBatch/:testBatchId/:requisitionId',
										data : {
											roles : [ 'ROLE_USER' ],
											pageTitle : 'Propellant_details'
										},
										views : {
											'content@' : {
												templateUrl : 'scripts/app/entities/propellant_details/propellant_detailss.html',
												controller : 'Propellant_detailsController'
											}
										},
										resolve : {}
									})
							.state(
									'propellant_detailsWithTestBatch',
							       {
										parent : 'entity',
										url :  '/propellant_details/forTestBatch/:testBatchId/:requisitionId',
										data: {
											roles:['ROLE_USER'],
											pageTitle : 'Propellant_details'
										},
										views: {
											'content@':{
												templateUrl : 'scripts/app/entities/propellant_details/propellant_detailss.html',
												controller : 'Propellant_detailsController'
											}
										},
										resolve : {}
							       });
								
									
				});
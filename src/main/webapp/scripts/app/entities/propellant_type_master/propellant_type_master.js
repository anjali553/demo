'use strict';

angular.module('doiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('propellant_type_master', {
                parent: 'entity',
                url: '/propellant_type_master',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Propellant_type_masters'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/propellant_type_master/propellant_type_masters.html',
                        controller: 'Propellant_type_masterController'
                    }
                },
                resolve: {
                }
            })
            .state('propellant_type_masterDetail', {
                parent: 'entity',
                url: '/propellant_type_master/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Propellant_type_master'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/propellant_type_master/propellant_type_master-detail.html',
                        controller: 'Propellant_type_masterDetailController'
                    }
                },
                resolve: {
                }
            })
            .state('propellant_type_masterForTestBatch',{
            	
            	parent : 'entity',
				url : '/propellant_type_master/forTestBatch/:testBatchId/:requisitionId',
				data : {
					roles : [ 'ROLE_USER' ],
					pageTitle : 'Propellant_details'
				},
				views : {
					'content@' : {
						templateUrl : 'scripts/app/entities/propellant_type_master/propellant_type_masters.html',
						controller : 'Propellant_type_masterController'
					}
				},
				resolve : {
				}
			});
            	
           
    });

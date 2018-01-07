'use strict';

angular.module('doiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('parameter_master', {
                parent: 'entity',
                url: '/parameter_masters',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Parameter_masters'
                },
                views: {
                    'adminEntities@': {
                        templateUrl: 'scripts/app/entities/parameter_master/parameter_masters.html',
                        controller: 'Parameter_masterController'
                    }
                },
                resolve: {
                }
            })
            .state('parameter_master.detail', {
                parent: 'entity',
                url: '/parameter_master/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Parameter_master'
                },
                views: {
                    'adminEntities@': {
                        templateUrl: 'scripts/app/entities/parameter_master/parameter_master-detail.html',
                        controller: 'Parameter_masterDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Parameter_master', function($stateParams, Parameter_master) {
                        return Parameter_master.get({id : $stateParams.id});
                    }]
                }
            })
            .state('parameter_master.new', {
                parent: 'parameter_master',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/parameter_master/parameter_master-dialog.html',
                        controller: 'Parameter_masterDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {parameter_name: null, has_details: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('parameter_master', null, { reload: true });
                    }, function() {
                        $state.go('parameter_master');
                    })
                }]
            })
            .state('parameter_master.edit', {
                parent: 'parameter_master',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/parameter_master/parameter_master-dialog.html',
                        controller: 'Parameter_masterDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Parameter_master', function(Parameter_master) {
                                return Parameter_master.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('parameter_master', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });

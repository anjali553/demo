'use strict';

angular.module('doiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('uom', {
                parent: 'entity',
                url: '/uom',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Uoms'
                },
                views: {
                    'adminEntities@': {
                        templateUrl: 'scripts/app/entities/uom/uoms.html',
                        controller: 'UomController'
                    }
                },
                resolve: {
                }
            })
            .state('uomDetail', {
                parent: 'entity',
                url: '/uom/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Uom'
                },
                views: {
                    'adminEntities@': {
                        templateUrl: 'scripts/app/entities/uom/uom-detail.html',
                        controller: 'UomDetailController'
                    }
                },
                resolve: {
                }
            });
    });

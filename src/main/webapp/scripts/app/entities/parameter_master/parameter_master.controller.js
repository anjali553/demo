'use strict';

angular.module('doiApp')
    .controller('Parameter_masterController', function ($scope, Parameter_master, ParseLinks) {
        $scope.parameter_masters = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Parameter_master.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.parameter_masters.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.parameter_masters = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Parameter_master.get({id: id}, function(result) {
                $scope.parameter_master = result;
                $('#deleteParameter_masterConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Parameter_master.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteParameter_masterConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.parameter_master = {parameter_name: null, has_details: null, id: null};
        };
    });

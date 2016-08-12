/************************************************************************/
/*  sites.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  Site Page Module for Angular                                        */
/*  Included into sites_ltr.html & sites_rtl.html view template         */
/************************************************************************/

var sitePage = angular.module('sitePage',['angularUtils.directives.dirPagination']);

sitePage.controller('SitesController',  function ($scope,$http) {

	$scope.sites = [];
    $scope.pageSize = 10;

    $scope.sort = function(keyname){
        $scope.sortKey = keyname; 
        $scope.reverse = !$scope.reverse;
    }

	$scope.fetchAll = function() {
        $http(
            {
                method: "GET",
                url: "/api/sites"
            }
        )
        .success(function(result) {
			$scope.sites = result;
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
 	}



    $scope.fetchImage = function(documentId) {
        $http({
            method: "GET",
            url: "/api/files/"+documentId       
        })
        .success(function(result) {
             document.getElementById(documentId).src=result[0].value;
        })
        .error(function(error) {
                    console.log(JSON.stringify(error));
        })       
   }

});

angular.element(document).ready(function() {
   angular.bootstrap(document.getElementById("sitePage"), ['sitePage']);
});
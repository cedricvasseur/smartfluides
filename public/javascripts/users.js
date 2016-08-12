/************************************************************************/
/*  users.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  Users Page Module for Angular                                       */
/*  Included into users_ltr.html & users_rtl.html view template         */
/************************************************************************/

var userlist = angular.module('userlist',['angularUtils.directives.dirPagination']);

userlist.controller('UsersController',  function ($scope,$http) {

	$scope.users = [];
    $scope.pageSize = 10;

    $scope.sort = function(keyname){
        $scope.sortKey = keyname; 
        $scope.reverse = !$scope.reverse;
    }

	$scope.fetchAll = function() {
        $http(
            {
                method: "GET",
                url: "/api/users"
            }
        )
        .success(function(result) {
			$scope.users = result;
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
   angular.bootstrap(document.getElementById("userlist"), ['userlist']);
});
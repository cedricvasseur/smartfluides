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

});

angular.element(document).ready(function() {
   angular.bootstrap(document.getElementById("userlist"), ['userlist']);
});
	app.controller('UsersController',  function ($scope,$http) {
	
		$scope.users = [];

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
var app = angular.module('app', [])
	.controller('LanguageController',  function ($scope,$http) {
	
		$scope.languages = [];

 		$scope.fetchAll = function() {
	        $http(
	            {
	                method: "GET",
	                url: "/api/languages"
	            }
	        )
	        .success(function(result) {
				$scope.languages = result;
	        })
	        .error(function(error) {
	            console.log(JSON.stringify(error));
	        });
    	}

	});
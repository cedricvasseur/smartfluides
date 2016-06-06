var user = angular.module('user',[]);

user.controller('UserController',  function ($scope,$http, $state, $stateParams) {

    $scope.initUser = function(){
        if($stateParams.documentId) {
            $http(
                {
                    method: "GET",
                    url: "/api/users",
                    params: {
                        document_id: $stateParams.documentId
                    }
                }
            )
            .success(function(result) {
                    $scope.inputForm = result[0].users;
            })
            .error(function(error) {
                console.log(JSON.stringify(error));
            });
        }
    }


   $scope.getImage = function() {
        $http({
             method: "GET",
             url: "/api/users/images",
             params: {
                document_id: "file." + $stateParams.documentId
              }
            
        })
                
        .success(function(result) {
             $scope.imageForm = result[0].base64;
        })
                
        .error(function(error) {
                    console.log(JSON.stringify(error));
        })       
   }    

});

angular.element(document).ready(function() {
   angular.bootstrap(document.getElementById("user"), ['user']);
});
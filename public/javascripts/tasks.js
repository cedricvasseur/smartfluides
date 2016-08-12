/************************************************************************/
/*  tasks.js                                                            */
/*  VASSEUR cedric @2016                                                */
/*  Tasks Page Module for Angular                                       */
/*  Included into tasks_ltr.html & tasks_rtl.html view template         */
/************************************************************************/

var taskPage = angular.module('taskPage',['angularUtils.directives.dirPagination']);

taskPage.controller('TasksController',  function ($scope,$http) {

    $scope.tasks = [];
    $scope.pageSize = 10;

    $scope.sort = function(keyname){
        $scope.sortKey = keyname; 
        $scope.reverse = !$scope.reverse;
    }

    $scope.fetchAll = function() {
        $http(
            {
                method: "GET",
                url: "/api/tasks"
            }
        )
        .success(function(result) {
            $scope.tasks = result;
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }

    $scope.getClass = function getClass(value) {
        
        if(value >= 66) return "progress-bar progress-bar-success";

        if(value >= 33) return "progress-bar progress-bar-warning";
        
        if(value >= 0) return "progress-bar progress-bar-danger";
    };

    $scope.delete = function(id){
        $http(
            {
                method: "DELETE",
                url: "/api/tasks/"+id
            }
        )        
        .success(function(result) {

            var index = -1;     
            var comArr = eval( $scope.tasks );
            for( var i = 0; i < comArr.length; i++ ) {
                if( comArr[i].id === id ) {
                    index = i;
                    break;
                }
            }
            
            if( index === -1 ) {
                alert( "Something gone wrong" );
            }
            $scope.tasks.splice(index, 1);
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });

    };

});

angular.element(document).ready(function() {
   angular.bootstrap(document.getElementById("taskPage"), ['taskPage']);
});
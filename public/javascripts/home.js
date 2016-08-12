/************************************************************************/
/*  home.js                                                             */
/*  VASSEUR cedric @2016                                                */
/*  Home Page Module for Angular                                        */
/*  Included into home_ltr.html & home_rtl.html view template           */
/************************************************************************/


var home = angular.module("homeApp", ['ngSanitize']);


home.controller('SitesController',  function ($scope,$http) {

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
                url: "/api/sites/samples"
            }
        )
        .success(function(result) {
            $scope.sites = result;
        })
        .error(function(error) {
            console.log(JSON.stringify(error));
        });
    }
});


home.controller('UsersController',  function ($scope,$http) {

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
                url: "/api/users/samples"
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

home.controller('ExampleFormController',  function ($scope,$http) {
      $scope.create = function(task) {
        $http(
            {
                method: "POST",
                url: "/api/tasks/",
                data:task
            }
        )
        .success(function(result) {
            $scope.message = "<div class=\"alert alert-success\"> <strong>Success!</strong> Indicates a successful or positive action.</div>";
        })
        .error(function(error) {
            $scope.message = "<div class=\"alert alert-success\"> <strong>Success!</strong> Indicates a successful or positive action.</div>";
        });
      };

    });


home.controller('myCtrlHC', function ($scope) {
	Highcharts.chart('container', {
        title: false,
    	xAxis: {
	        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	    },
	    series: [{
	        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
	    }]
	});
});


home.controller('myCtrlHC2', function ($scope) {
	Highcharts.chart('container2', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: ''
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45,
                dataLabels: {
                        enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Delivered amount',
            data: [
                ['Bananas', 8],
                ['Kiwi', 3],
                ['Mixed nuts', 1],
                ['Oranges', 6],
                ['Apples', 8],
                ['Pears', 4],
                ['Clementines', 4],
                ['Reddish (bag)', 1],
                ['Grapes (bunch)', 1]
            ]
        }]

	});
});


var myPlotBands = [{ // Light air
                from: 0,
                to: 2,
                color: 'rgba(68, 170, 213, 0.1)'
            }, { // Light breeze
                from: 2,
                to: 4,
                color: 'rgba(0, 0, 0, 0)'
            }, { // Gentle breeze
                from: 4,
                to: 6,
                color: 'rgba(68, 170, 213, 0.1)'
            }, { // Moderate breeze
                from: 6,
                to: 8,
                color: 'rgba(0, 0, 0, 0)'
            }, { // Fresh breeze
                from: 8,
                to: 10,
                color: 'rgba(68, 170, 213, 0.1)'
            }, { // Strong breeze
                from: 10,
                to: 12,
                color: 'rgba(0, 0, 0, 0)'
            }, { // High wind
                from: 12,
                to: 14,
                color: 'rgba(68, 170, 213, 0.1)'
            }];


home.controller('myCtrlHC3', function ($scope,$http) {

   var mychart = Highcharts.chart('container3', {
        chart: {
            type: 'spline'
        },
        title: false,
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            title: { text: title_chart},
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: myPlotBands
        },
        tooltip: {
            valueSuffix: ' m3'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: { hover: {lineWidth: 5}},
                marker: { enabled: false},
                pointInterval: 3600000, // one hour
                pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
            }
        },
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });

    $http({
            method: "GET",
            url: "/api/consumptions/sites"
    })
    .success(function(result) {
        for(var i in result) {
            var item = result[i];
            mychart.addSeries({ 
                    name: item.value.name,
                    data: item.value.consumption
                });
        }
    })
    .error(function(error) {
        console.log(JSON.stringify(error));
    }); 


});


angular.bootstrap(document.getElementById("homeApp"), ['homeApp']);
// On supprime le text des Highcharts
$("text:contains('Highcharts.com')").remove();

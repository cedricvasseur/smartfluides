/************************************************************************/
/*  application.js                                            	        */
/*  VASSEUR cedric @2016                                                */
/*  Main Module for Angular                                             */
/*  Included into header.html view template                             */
/************************************************************************/

var app = angular.module('app',[]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
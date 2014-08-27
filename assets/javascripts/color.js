(function(){
  var app = angular.module('color', []);

  app.controller('ColorController', function() {
    var color = this;

    color.start = "#000000";
    color.middle = "#808080";
    color.end = "#FFFFFF";
  });
})();

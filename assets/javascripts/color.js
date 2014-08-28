(function(){
  var app = angular.module('color', []);

  app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);

  app.controller('ColorController', [ '$http', function($http) {
    var color = this;

    color.start = "000000";
    color.middle = "808080";
    color.end = "FFFFFF";

    this.inputChanged = function() {
      if (!properInputSizes()) return;

      var call = "http://color-divider.herokuapp.com/middle_color?start_color=%23" + color.start + "&end_color=%23" + color.end;

      $http.get(call).success(function(data){
        color.middle = data.substr(1);
      });
    }

    function properInputSizes() {
      return (color.start.length == 3 || color.start.length == 6) && /^([0-9a-fA-F]+)$/.test(color.start) && (color.end.length == 3 || color.end.length == 6) && /^([0-9a-fA-F]+)$/.test(color.end);
    }
  }]);
})();

(function(){

  angular.module('color', [])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  .controller('ColorController', [ '$http', function($http) {
    var color = this;

    color.start  = { label: "Start",  hex: "000000", actionable: true };
    color.middle = { label: "Middle", hex: "808080", actionable: false };
    color.end    = { label: "End",    hex: "FFFFFF", actionable: true };

    color.inputChanged = function() {
      if (!properInputSizes()) return;

      var call = "http://color-divider.herokuapp.com/middle_color?start_color=%23" + color.start.hex + "&end_color=%23" + color.end.hex;
      console.log(call);

      $http.get(call).success(function(data){
        color.middle.hex = data.substr(1);
      });
    }

    function properInputSizes() {
      return colorInputCheck(color.start.hex) && colorInputCheck(color.end.hex);
    }

    function colorInputCheck(color) {
      return (color.length == 3 || color.length == 6) && /^([0-9a-fA-F]+)$/.test(color);
    }
  }])

  .directive('actionBox', function() {
    return {
      restrict: 'E',
      templateUrl: 'action-box.html'
    };
  });
})();

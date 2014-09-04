(function(){

  angular.module('color', [])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  .controller('ColorController', [ '$http', function($http) {
    var color = this;

    color.inputs = {
      end: { label: "end",  hex: "FFFFFF", actionable: true },
      middle: { label: "middle", hex: "808080", actionable: false },
      start: { label: "start",    hex: "000000", actionable: true }
    };

    color.inputChanged = function() {
      if (!colorInputsGood()) return;

      var call = "http://color-divider.herokuapp.com/middle_color?start_color=%23" + color.inputs.start.hex + "&end_color=%23" + color.inputs.end.hex;

      $http.get(call).success(function(data){
        color.inputs.middle.hex = data.substr(1);
      });
    }

    function colorInputsGood() {
      return colorInputCheck(color.inputs.start.hex) && colorInputCheck(color.inputs.end.hex);
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

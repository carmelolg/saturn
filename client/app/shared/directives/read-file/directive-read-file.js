'use strict';

angular.module('saturnApp').directive('onReadFile', onReadFile);

/* @ngInject */
function onReadFile($parse) {
  var directive = {
    restrict: 'A',
    scope: false,
    link: linkFn
  };

  function linkFn(scope, element, attrs){
    var fn = $parse(attrs.onReadFile);

    element.on('change', function(onChangeEvent) {
      var reader = new FileReader();

      reader.onload = function(onLoadEvent) {
        scope.$apply(function() {
          fn(scope, {
            $fileContent: onLoadEvent.target.result
          });
        });
      };

      reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
    });
  }

  return directive;

}

;(function() {

  'use strict';
  angular
    .module('boilerplate')
    .directive('feed', feed);

	feed.$inject = ['$timeout'];
  function feed($timeout) {

    // Definition of directive
    var directiveDefinitionObject = {
		restrict: 'E',
		templateUrl: 'components/directives/feed.html',
		scope: {
			items: '='
		}
    };

    return directiveDefinitionObject;
  }

})();

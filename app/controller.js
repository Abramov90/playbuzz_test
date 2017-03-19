/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
;(function() {

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['$sce', '$scope', 'QueryService', 'CONSTANTS'];

  function MainController($sce, $scope, queryService, CONSTANTS) {

    $scope.items = [];

	queryService.query('GET', CONSTANTS.GET_ITEMS).then(function(data) {
		if (data.status === 200) {
			$scope.items = parseItems(data.data.items);
		}
	});



	function parseItems(items) {
		if (items && items.length) {
			return items.map(function(item, index) {
				var _result = {
					title: item.title ? item.title : 'untitled',
					views: formatViewsCount(item.views),
					available: true,
					host: item.source,
				};
				var _src = null;
				if (item.source === CONSTANTS.YOUTUBE) {
					_src = 'https://www.youtube.com/embed/' + item.videoId;
				} else if (item.source === CONSTANTS.FB) {
					_src = 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fvideos%2F' +
						item.videoId + '&show_text=0&width=400'
				} else {
					_src = item.url;
				}

				queryService.checkCrossOriginContent(_src)
					.then(function(response) {
						parseCrossOriginContent(response.data, index);
					});
				_result.source = $sce.trustAsResourceUrl(_src);
				return _result;
			});
		} else {
			return [];
		}
	};

	function parseCrossOriginContent(content, itemIndex) {
		var _filtered = angular.element(content.data).filter(function(index, elem) {
			return elem.id === 'player';
		});

		$scope.items[itemIndex].available = _filtered.length > 0;
	};

	function formatViewsCount(count) {
		var _result = count / 1e6;
		if (_result > 1) {
			return Number(_result).toFixed(2) + 'M';
		} else {
			return count;
		}
	};

	};

})();

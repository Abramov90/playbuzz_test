;(function() {


	/**
	 * Place to store API URL or any other constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
	 */
  angular
  	.module('boilerplate')
    .constant('CONSTANTS', {
      'API_URL': 'https://cdn.playbuzz.com/',
	  'GET_ITEMS': 'content/feed/items',
	  'PROXY_URL': 'http://localhost:5050/',
	  'YOUTUBE': 'youtube',
	  'FB': 'facebook'
    });


})();

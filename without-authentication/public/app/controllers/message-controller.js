angular.module('SPAAuth').controller('MessageController', ['$scope', '$http', function($scope, $http) {
	$scope.messages = {};

	$http.get('/api/secured/message').success(function(data) {
		$scope.messages.secured = data.message || data.error;
	});

	$http.get('/api/message').success(function(data) {
		$scope.messages.unsecured = data.message || data.error;
	});
}]);
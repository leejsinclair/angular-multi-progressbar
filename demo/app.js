/*
 Example angular app
 */
(function(){
	'use strict';
	angular.module('test', [ 'multi-progress-bar' ])
		.controller('testCtrl', [ '$scope', 'multiProgressService', function( $scope, multiProgressService ) {
			$scope.angularStatus = 'Running';
			$scope.files = [];

			$scope.addFile = function() {
				$scope.files.push(multiProgressService.push( { 'label': 'File ' + $scope.files.length, 'percent': 0 } ));
			};

			$scope.addPercentage = function( $index, num ) {
				multiProgressService.updateProgress( $scope.files[$index], $scope.files[$index].percent + num );
			};
		}]);
})();
/**
 * Multi-Progress bar
 */
(function(angular){
	'use strict';
	var multiWidgetsModule = angular.module('multi-progress-bar', []);

	/**
	 * Multi progress directive <div position="bottom" class="multi-progress"></div>
	 * @return {Object} AngularJS Driective
	 */
	multiWidgetsModule.directive('multiProgress', function() {
		
		return {
			'restrict': 'C',
			'templateUrl': 'template/progress/multi-progress.html',
			'scope': {
				'position': '=position'
			},
			'link': function( scope, iElm, iAttrs ) {
				//scope.closeable = 'close' in iAttrs || null;
				scope.position = iAttrs.position || 'bottom';
			},
			'controller': 'multiProgressCtrl'
		};
	});

	/**
	 * Single progress bar <div ng-repeat="bar in progressBars" progress-bar ng-model="bar" class="multi-progress-bar"></div>
	 * Data requirements:
	 *      { 'id': page level unique Id, 'label': progress bar label, 'percent': integer representing percentage complete }
	 * @return {Object} AngularJS Driective
	 */
	multiWidgetsModule.directive('progressBar', function() {
		return {
			'restrict': 'EA',
			'templateUrl': 'template/progress/progress-bar.html',
			'require': 'ngModel',
			'controller': 'progressCtrl'
		};
	});

	/**
	 * Multi progress bar controller
	 * @param  {Object} $scope               Controller scope object
	 * @param  {Object} $attrs               Element attributes (JSON)
	 * @param  {DOM} $element             DOM object of element within which this controller sits
	 * @param  {Object} multiProgressService Single point of reference to addand remove progress bars across controllers and views
	 */
	multiWidgetsModule.controller('multiProgressCtrl', [ '$scope', '$attrs', '$element', 'multiProgressService', function( $scope, $attrs, $element, multiProgressService ) {
		$scope.progressBars = multiProgressService.getProgressStates();
		$scope.$watch( 'progressBars', function(){
			if($scope.progressBars.length===0) {
				//$($element).css('display','none');
				$element.attr('style','display:none');
			} else {
				$element.attr('style','display:block');
			}
		}, true);
		
	}]);

	/**
	 * Wrapper controller for each progress bar, just because one is needed
	 */
	multiWidgetsModule.controller('progressCtrl', function( ) {
		
	});

	/**
	 * Single point of reference to add, update and remove progress bars
	 * @param  {Object} $rootScope rootscope, where $apply can be called to force GUI updates
	 * @return {Object}            AngularJS factoty
	 */
	multiWidgetsModule.factory('multiProgressService', [ '$rootScope', function( $rootScope ) {
		// Contains all of the progress states across all controllers and views
		var progressStates = [];

		return {
			'getProgressStates': function() {
				return progressStates;
			},
			updateProgress: function( item, progress, forceApply ) {
				item.percent = Math.min( progress, 100);
				if( item.percent >= 100 ) {
					this.remove( item );
				}
				if(forceApply) {
					$rootScope.$apply();
				}
			},
			'push': function( details ) {
				details.id = new Date().getTime();
				progressStates.push( details );
				return progressStates[progressStates.length-1];
			},
			'remove': function( details ) {
				var id = details.id;
				var index = -1;
				for(var i=i;i<progressStates.length;i++) {
					if(progressStates[i].id===id) index = i;
				}

				if( index )
					progressStates.splice(i,1);
			}
		};
	}]);

	/**
	 * HTML template for multi-progress bars
	 * @param  {Object} $templateCache Allows access to Angular's template cache
	 */
	multiWidgetsModule.run(["$templateCache", function($templateCache) {
		$templateCache.put("template/progress/multi-progress.html",
		'<div class="multi-progress-container">\n' +
		'    <div ng-repeat="bar in progressBars" progress-bar ng-model="bar" class="multi-progress-bar"></div>\n' +
		'</div>\n'+
		'');
	}]);

	/**
	 * HTML template for a single progress bar
	 * @param  {Object} $templateCache Allows access to Angular's template cache
	 */
	multiWidgetsModule.run(["$templateCache", function($templateCache) {
		$templateCache.put("template/progress/progress-bar.html",
		'<div class="progress-container">\n'+
		'   <div class="progress">\n' +
		'       <div class="progress-bar progress-bar-{{bar.type}}" style="width:{{bar.percent}}%"><span ng-bind="bar.label"></span></div>\n' +
		'   </div>\n'+
		'</div>\n'+
		'');
	}]);
})(window.angular);
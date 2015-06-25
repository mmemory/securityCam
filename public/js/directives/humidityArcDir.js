angular.module('securityCam')
.directive('humidityArc', ['d3Service', '$interval', function(d3Service, $interval) {
  return {
  	restrict: 'EA',
  	scope: {
  		humidityData: '='
  	},
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {        

	      var buildGraph = function() {

	      	var humidity = scope.humidityData;
	      	console.log(humidity);

	      	var data = 100 - humidity;

					var canvas = d3.select(element[0]).append('svg')
							.attr('width', 200)
							.attr('height', 130);

					var group = canvas.append('g')
						.attr('transform', 'translate(90, 67)');

					var r = 50;  //radius
					var p = Math.PI * 2; // perimeter = radian (pi * 2)
					var end = data / 16;

					var arc = d3.svg.arc()
						.innerRadius(r - 10)
						.outerRadius(r)
						.startAngle(0)
						.endAngle(p - end);

					group.append('path')
						.attr('d', arc)
						.attr('fill', '#C8E6C9')
						.attr('border-radius', '1');

				};

      	$interval(buildGraph, 1000, 0);
      	// buildGraph();

    	});
  	}
  } ; 
}]);
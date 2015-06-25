angular.module('securityCam')
.directive('tempGraph', ['d3Service', '$interval', function(d3Service, $interval) {
  return {
  	restrict: 'EA',
  	scope: {
  		tempData: '='
  	},
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {        

	      var buildGraph = function() {

					var m = [8, 30, 8, 30], // margins
						  w = 280 - m[1] - m[3], // width
					 	  h = 120 - m[0] - m[2]; // height

					 	  
					var data = scope.tempData;
					
					var x = d3.scale.linear()
						.domain([0, data.length])
						.range([0, w]);
					var y = d3.scale.linear()
						.domain([d3.min(data), d3.max(data)])
						.range([h, 0]);

					var line = d3.svg.line()
						.x(function(d,i) { return x(i); })
						.y(function(d) { return y(d); })
						.interpolate('basis');

						var graph = d3.select(element[0]).append("svg:svg")
						      .attr("width", w + m[1] + m[3])
						      .attr("height", h + m[0] + m[2])
						    .append("svg:g")
						      .attr("transform", "translate(" + (m[3]+30) + "," + (m[0]) + ")");

						var yAxisLeft = d3.svg.axis()
							.scale(y)
							.ticks(4)
							.orient("left");

						graph.append("svg:g")
						      .attr("class", "y axis")
						      .attr("transform", "translate(-25,0)")
						      .style('fill', '#C5CAE9')
						      .style('font-size', '.9em')
						      .call(yAxisLeft);
						
			  		graph.append("svg:path").attr("d", line(data));

				};

      	$interval(buildGraph, 1000, 0);
      	// buildGraph();

    	});
  	}
  } ; 
}]);
angular.module('securityCam')
.directive('dashMonthly', ['d3Service', '$interval', function(d3Service, $interval) {
  return {
  	restrict: 'EA',
  	scope: {
  		barData: '='
  	},
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {        

	      var buildGraph = function() {

      		var bardata = scope.barData;
	      	// console.log('bardata', bardata, 'scope.barData', scope.barData)

	      	var height = 50,
	      		  width = 190,
	      		  margin = { top: 5, right: 5, bottom: 7, left: 5},
	      		  barWidth = 20,
	      		  barOffset = 5;

	      	var tempColor;

	      	var tooltip = d3.select('body').append('div')
				    .style('position', 'absolute')
				    .style('padding', '0 10px')
				    .style('background', 'white')
				    .style('opacity', .3);

				  var colors = d3.scale.linear()
				  	.domain([0, d3.max(bardata)])
			  		.range(['#81C784', '#C8E6C9']);

				  var test = d3.max(bardata);
				  // console.log("max test", test);

	      	var yScale = d3.scale.linear()
	      		.domain([0, d3.max(bardata)])
	      		.range([0, height]);

	      	var xScale = d3.scale.ordinal()
	      		.domain(d3.range(0, bardata.length))
	      		.rangeBands([0, width], .1);

	      	var canvas = d3.select(element[0]).append('svg')
	      		.attr('width', width + margin.left + margin.right)
	      		.attr('height', height + margin.top + margin.bottom)
	      		.attr('margin-left', '40px')
	      		.append('g')
	      		.selectAll('rect').data(bardata)
						.enter().append('rect')
							.style('fill', colors)
							.attr('width', xScale.rangeBand())
							.attr('height', 0)
							.attr('x', function(d, i) { return xScale(i) })
							.attr('y', height - margin.top - margin.bottom)
								// .append("text")
							 //    .attr("x", function(d, i) { return xScale(i) - 20 })
							 //    .attr("y", height)
							 //    .attr("fill", "#3949AB")
							 //    .attr("dy", ".35em")
							 //    .text(function(d) { return d; })
						.on('mouseover', function (d) {
					        tooltip.transition()
					            .style('opacity', .9);
					        tooltip.html(d + " photos")
					            .style('left', (d3.event.pageX - 40) + 'px')
					            .style('top', (d3.event.pageY - 50) + 'px');
					        tempColor = this.style.fill;
					        d3.select(this)
					            // .style('opacity', .6)
					            .style('fill', '#43A047');
					            // .attr('height', function(d) { return yScale(d) - 15 })
					            // .attr('y', function(d) { return height - yScale(d) - 30 })
					    })
					  .on('mouseout', function(d) {
					        tooltip.transition()
					            .style('opacity', 0)
					            .duration(200);
					        d3.select(this)
					            .style('opacity', 1)
					            .style('fill', tempColor);
					            // .attr('height', function(d) { return yScale(d) })
					            // .attr('y', function(d) { return height - yScale(d) })
					  });

					canvas.transition()
						.attr('height', function(d) { return yScale(d); })
						.attr('y', function(d) { return height - yScale(d); })
						// .delay(function(d, i) { return i * 150 })
						.duration(1500)
						.ease('elastic');

					var vAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')
						.ticks(8);

					var vGuide = d3.select('svg'[0]).append('g');
						vAxis(vGuide);
						vGuide.attr('transform', 'translate(35, 0)');
						vGuide.selectAll('path')
							.style({ fill: 'none', stroke: '#000' });
						vGuide.selectAll('line')
							.style({ stroke: '#000' })
							.style('font-size', '10px');
				};

      	// $interval(buildGraph, 3500, 1);
      	buildGraph();

    	});
  	}
  };  
}]);
angular.module('securityCam')
	.directive('dummyArc', ['d3Service', '$interval', function(d3Service, $interval) {
	  return {
	  	restrict: 'EA',
	  	scope: {
	  		arcData: '='
	  	},
	    link: function(scope, element, attrs) {
	      d3Service.d3().then(function(d3) {

	      	var buildGraph = function() {

	      	  // console.log('arcData from Dir', scope.arcData)
	      
					var data = scope.arcData;
					var r = 55;
		  
		  		    var color = d3.scale.ordinal()
		      			// .domain([0, .5])
					  	.range(['#1B5E20', '#81C784']);

					var canvas = d3.select(element[0]).append('svg')
						.attr('width', 260)
						.attr('height', 130);

					var group = canvas.append('g')
						.attr('transform', 'translate(130, 65)');

					var arc = d3.svg.arc()
						.innerRadius(30) //set to 0 for a pie chart
						.outerRadius(r);

					var pie = d3.layout.pie()
						.value(function(d) { return d; });

					var arcs = group.selectAll('.arc')
						.data(pie(data))
						.enter()
						.append('g')
						.attr('class', 'arc');

					arcs.append('path')
						.attr('d', arc)
						.attr('fill', function(d) { return color(d.data); });

			};

			// $interval(buildGraph, 3500, 1);
			buildGraph();

	    	});
	    }
		};
	}]);
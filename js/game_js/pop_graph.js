var svg = d3.select("#pop_graph").append("svg:svg")
									.attr("width", 300).attr("height", 225);

var yScale = d3.scale.linear().domain([0, 6]).range([190, 0]);

var yAxis = d3.svg.axis()
				  .scale(yScale)
				  .orient("left")
				  .ticks(5);

svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + 50 + "," + 10 + ")")
	.call(yAxis);



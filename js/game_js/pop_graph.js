/*var infected_count = 100;
function d3_appear() {
	var svg = d3.select("#pop_graph").append("svg")
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

	svg.select("rect")
		.data(infected_count)
		.enter()
		.append("rect")
		.attr("x", 150)
		.attr("y", function(d) {
			return d;
		})
		.attr("width", 10)
		.attr("height", 10)
		.attr("col", "green"); 

}*/ 
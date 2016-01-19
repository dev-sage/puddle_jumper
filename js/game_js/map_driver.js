var start_time = new Date().getTime();
var target_list = Array();
var saved_list = Array();
var infected_list = Array();
function main() {
	
	//Launch a new plane
	new_flight = new flight();

	launch_plane(new_flight);

	if(new_flight.infected_status) {

		var $warning = $("<div id = 'inf_status'></div>");

		$("body").append($warning);
		$warning.append("<center> AN INFECTED FLIGHT HAS BEEN DETECTED EN ROUTE TO " + new_flight.destination.toUpperCase() +  "</center>");
		$warning.fadeOut(4000, function() { $warning.remove(); });

		target_list.push([new_flight.destination, new_flight.departure_time]);

	}

	//Update choropleth
	update_country_layer();

	//Update status (population, etc.)

	//set_layer(123);
}
setInterval(main, 1250);



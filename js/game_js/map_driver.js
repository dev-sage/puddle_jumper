var start_time = new Date().getTime();
var target_list = Array();
var saved_list = Array();
var infected_list = Array();
var infected_count = 0;
var count = 0;
function main() {
	if(count < 100) {
		
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

	} else if(count == 100) {
		$("body").append($("<div id = 'game_over'><center>GAME OVER</center></div>"));
	}

	var $current_count = $("<div id = 'inf_count'><center>" + numberWithCommas(infected_count) + "</center></div>").fadeIn(1000, function() { $current_count.remove(); });

	$("#pop_graph").append($current_count);

	count++;
}

setInterval(main, 1250);



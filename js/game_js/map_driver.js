var start_time = new Date().getTime();

function main() {
	
	var current_time = new Date().getTime();
	
	//Launch a new plane

	new_flight = new flight();

	launch_plane(new_flight);

	console.log(new_flight.infected_status);

	if(new_flight.infected_status) {

		var $warning = $("<div id = 'inf_status'><center>AN INFECTED FLIGHT HAS BEEN DETECTED!</center></div>");

		$("body").append($warning);
		
		$warning.fadeOut(4000, function() { $warning.remove(); });
	}

	//Update choropleth

	//Update status (population, etc.)
}

//setInterval(main, 2000);

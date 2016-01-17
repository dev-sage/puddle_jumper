// Determining infected status of flight.
function get_infected_status() {
	var chance_num = Math.floor(Math.random() * (4)) + 1;
	if(chance_num == 1) { return true; }
	else { return false; }
}


function main() {

	//Launch a new plane
	new_flight = new flight();
	launch_plane(new_flight);

	//Update choropleth

	//Update status (population, etc.)
}

setInterval(main, 2000);

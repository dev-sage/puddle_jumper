var path = function(start_loc, end_loc) {
	
	this.start_coords = { x: parseFloat(country_list[start_loc][2]),
					  	  y: parseFloat(country_list[start_loc][1]) };

	this.end_coords = { x: parseFloat(country_list[end_loc][2]),
					    y: parseFloat(country_list[end_loc][1]) };

}

// Define the flight class
var flight = function () {

	var start_loc = random_path(), end_loc = random_path();

	this.path = new path(start_loc, end_loc);

	this.origin = country_list[start_loc][0];

	this.destination = country_list[end_loc][0];

	//this.infected_status = get_infected_status();

	this.infected_status = true;
	
	this.departure_time = new Date().getTime();

}

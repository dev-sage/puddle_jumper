var path = function(start_loc, end_loc) {
	
	this.start_coords = { x: parseFloat(country_list[start_loc][2]),
					  	  y: parseFloat(country_list[start_loc][1]) };

	this.end_coords = { x: parseFloat(country_list[end_loc][2]),
					    y: parseFloat(country_list[end_loc][1]) };

}

// Define the flight class
var flight = function () {

	var start_loc = _.sample(populate_array(country_list), 1), end_loc = _.sample(populate_array(country_list), 1);

	this.path = new path(start_loc, end_loc);

	this.origin = country_list[start_loc][0];

	this.destination = country_list[end_loc][0];

	this.infected_status = get_infected_status();

	this.departure_time = new Date().getTime();

	if(this.infected_status) { 
		country_list.pop(end_loc); 
		console.log("Popping " + country_list[end_loc]);
	};

}

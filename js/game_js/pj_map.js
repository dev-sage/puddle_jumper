//$(document).ready(function() {

	var prompt = function() { return $("<div id = 'prompt'><center>You quarantined</center></div>"); }

	/**********************************************************/
	/* Create Map *********************************************/ 
	var map = L.map("map", {zoomControl: false}).setView([35.21, -10.18], 3);
  	L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={accessToken}', {
              attribution: "",
              maxZoom: 3,
              minZoom: 3,
              mapid: 'mapbox.satellite',
              accessToken: 'pk.eyJ1IjoiZWxzYWdlIiwiYSI6ImNpamRwYWJrMzAwYWF1dW0wYjhodW94cWIifQ.VyG5_na-uMb7-G14DZgRlQ'
              }).addTo(map);

	map.setMaxBounds(L.latLngBounds([-100, -190], [100, 190]));
	
	/* End Create Map *****************************************/ 
	/**********************************************************/

	/* DATA LOAD **********************************************/
    var world_pop;
    d3.text("data/country_data/world_pop.csv", function(error, _data){
             world_pop = d3.csv.parseRows(_data);
             world_pop = char_to_int(world_pop);
             console.log("Finished loading world_pop data.")
        });

    var country_list; var new_country_list = Array();
    d3.text("data/country_data/country_list.csv", function(error, _data){
             country_list = d3.csv.parseRows(_data);
             for(i = 0; i < world_pop.length; i++) {
          		for(j = 0; j < country_list.length; j++) {
          			if(country_list[j][0] == world_pop[i][0]) { new_country_list.push(country_list[j]) };
          		}	
             }
             country_list = new_country_list;
             console.log("Finished loading country_list data.")
        });


    function char_to_int(data) {
    	for(i = 0; i < data.length; i++) {
    		data[i][2] = parseInt(data[i][2]);
    	}
    	return(data);
    }
    /**********************************************************/

	/**********************************************************/
	/* Create Plane / Path ************************************/ 	
	/*var plane_icon = L.icon({
		iconUrl: 'icons/plane_right.png',
		shadowIcon: null,
		iconSize: [45, 45]
	})*/ 

	// StackExchange Function
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function populate_array(list) {
		var new_array = Array(list[0].length);
		for(i = 0; i < list.length; i++) {
			new_array.push(i);
		}
		return(new_array);
	}

	function get_infected_status() {
		var chance_num = Math.floor(Math.random() * (2)) + 1;
		if(chance_num == 1) { return true; }
		else { return false; }
	}

	function in_list(item, list) {
		for(i = 0; i<list.length; i++){
			if(item == list[i]) {return true;}
			else {return false;}
		}
	}

	function reverse_coords(coords) {
		var new_coords = Array(coords.length);
		for(i = 0; i < coords.length; i++) {
			new_coords[i] = [coords[i][1], coords[i][0]]
		}
		return(new_coords);
	}

	function launch_plane(flight) {
		var generator = new arc.GreatCircle(flight.path.start_coords, flight.path.end_coords);
		var line = generator.Arc(100, { offset: 100 });
		coords = line.json();
		var my_coords = reverse_coords(coords.geometry.coordinates);
		draw_flight_path(my_coords, flight);
	}

	function draw_flight_path(coords, flight) {

		var path = new L.Polyline(coords,
	            {snakingSpeed: 800, snakingPause: 0, color: "red", opacity: 0.50, weight: 2.00, onEnd: function() {console.log("Hello"); } });

		path.addTo(map).snakeIn();

		//Selecting appropriate icon.
		var icon, lon_diff, lat_diff;
		//console.log(coords[coords.length - 1]);
		lon_diff = coords[0][1] - coords[coords.length - 1][1];
		lat_diff = coords[0][0] - coords[coords.length - 1][0];

		if(lon_diff > 0) var w = true;
		if(lat_diff > 0) var s = true;

		if(w && s) {
			if(Math.abs(lon_diff/lat_diff) > 1) { icon = "my_icons/plane_w.png"; }
				else { icon = "my_icons/plane_s.png"; }
		} else if(w && !s) {
			if(Math.abs(lon_diff/lat_diff) > 1) { icon = "my_icons/plane_w.png"; }
				else { icon = "my_icons/plane_n.png"; }
		} else if(!w && s) {
			if(Math.abs(lon_diff/lat_diff) > 1) { icon = "my_icons/plane_e.png"; }
				else { icon = "my_icons/plane_s.png"; }
		} else if(!w && !s) {
			if(Math.abs(lon_diff/lat_diff) > 1) { icon = "my_icons/plane_e.png"; }
				else { icon = "my_icons/plane_n.png"; }
		}

		var plane_icon = L.icon({ iconUrl: icon, shadowIcon: null, iconSize: [45, 45] });

		var plane_marker = L.animatedMarker(coords, 
			{icon: plane_icon, interval: 50, 
				onEnd: function() {

					if(flight.infected_status && !in_list(flight.destination, saved_list)) {
						infected_list.push(flight.destination);
						for(i = 0; i < world_pop.length; i++) {
							if(flight.destination == world_pop[i][0]) { infected_count += world_pop[i][2]; break; }
						}
					};

					$(this._icon).fadeOut(1000, function() { map.removeLayer(this); map.removeLayer(path); })} 
				});

		map.addLayer(plane_marker);

	}

	/* End Create Plane / Path ********************************/ 
	/**********************************************************/


	/**********************************************************/
	/* Interactivity ******************************************/ 
	function update_country_layer() {
		for(layer in geojson._layers) {
			//console.log(typeof(geojson.getLayer(layer).feature.properties.admin));
			for(i = 0; i < infected_list.length; i++) {
				if(infected_list[i] == geojson.getLayer(layer).feature.properties.admin) { set_layer(layer, "red"); }
			}

			for(i = 0; i < saved_list.length; i++) {
				if(saved_list[i] == geojson.getLayer(layer).feature.properties.admin) { set_layer(layer, "green"); }
			}
		}
	}

	function set_layer(layer, col) {
			geojson.getLayer(layer).setStyle({
			color: col,
			fillOpacity: 0.5
		});
	}


	function style(feature) {
		return {
		    weight: 0.25,
		    color: "black",
		    opacity: 1,
		    fillOpacity: 0
		};
	}

	function highlightFeature(e) {
		var layer = e.target;			
		var highlight = true;
		for(i = 0; i < infected_list.length; i++) {
			if(infected_list[i] == e.target.feature.properties.admin) { highlight = false; }
		}

		for(i = 0; i < saved_list.length; i++) {
			if(saved_list[i] == e.target.feature.properties.admin) { highlight = false; }
		}

		if(highlight) {
			layer.setStyle({
						weight: 0.25,
						color: "yellow",
						fillOpacity: 0.5
					}); }

		if(!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
		}
	}

	function resetHighlight(e) {
		var reset = true;
		for(i = 0; i < infected_list.length; i++) {
			if(infected_list[i] == e.target.feature.properties.admin) { reset = false; }
		}

		for(i = 0; i < saved_list.length; i++) {
			if(saved_list[i] == e.target.feature.properties.admin) { reset = false; }
		}

		if(reset) { geojson.resetStyle(e.target); }
	} 

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: moveToFeature
		});
	}

	var clicked_country, current_time;
	function moveToFeature(e) {
		var $prompt = new prompt();
		current_time = new Date().getTime();
		map.fitBounds(e.target.getBounds());
		clicked_country = e.target.feature.properties.admin;
		//console.log(e.target.feature.properties);

		$("body").append($prompt);
		$prompt.append("<center>" + clicked_country + "</center>");
		$prompt.fadeOut(2000, function() { $prompt.remove(); });

		for(i = 0; i < target_list.length; i++) {
			if(clicked_country == target_list[i][0] && ((current_time - target_list[i][1]) < 5000)) {
				saved_list.push(clicked_country);
				console.log("Saved " + clicked_country);
			}
		}



	}

	geojson = L.geoJson(world_data, {style: style,
						   onEachFeature: onEachFeature}).addTo(map);

	/* End Interactivity ********************************/ 
	/****************************************************/
//});
  
//$(document).ready(function() {

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

  	var pop_scale = d3.scale.linear().domain([0, 140000000]).range([0, 1.0]);

	map.setMaxBounds(L.latLngBounds([-100, -190], [100, 190]));
	
	/* End Create Map *****************************************/ 
	/**********************************************************/

	/**********************************************************/
	/* Create Plane / Path ************************************/ 	
	var plane_icon = L.icon({
		iconUrl: 'icons/plane_right.png',
		shadowIcon: null,
		iconSize: [45, 45]
	})

	function reverse_coords(coords) {
		var new_coords = Array(coords.length);
		for(i = 0; i < coords.length; i++) {
			new_coords[i] = [coords[i][1], coords[i][0]]
		}
		return(new_coords);
	}

	function get_plane_path() {
		var start = { x: -77, y: 0 };
		var end = { x: 78, y: 40 };
		var generator = new arc.GreatCircle(start, end);
		var line = generator.Arc(100, { offset: 10 });

		coords = line.json();
		var my_coords = reverse_coords(coords.geometry.coordinates);

		draw_flight_path(my_coords);

	}	

	function draw_flight_path(coords) {
		var path = new L.Polyline(coords,
	            {snakingSpeed: 800, snakingPause: 0, color: "red", opacity: 1, weight: 1.00});
		path.addTo(map).snakeIn();

		var plane_marker = L.animatedMarker(coords, {icon: plane_icon, 
													  interval: 50,
													  });
		map.addLayer(plane_marker);

	}

	/* End Create Plane / Path ********************************/ 
	/**********************************************************/


	/**********************************************************/
	/* Interactivity ******************************************/ 
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

		layer.setStyle({
			weight: 0.25,
			color: "yellow",
			fillOpacity: 0.5
		});

		if(!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
		}
	}

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	geojson = L.geoJson(world_data, {style: style,
						   onEachFeature: onEachFeature}).addTo(map);

	/* End Interactivity ********************************/ 
	/****************************************************/
//});
  
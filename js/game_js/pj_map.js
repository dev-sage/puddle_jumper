$(document).ready(function() {
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
  	
	function style(feature) {
	    return {
	        weight: 0.25,
	    	color: "black",
	    	opacity: 1,
	    	fillOpacity: 0
	    	//fillOpacity: pop_scale(feature.properties.pop_est)
	    };
	}	

	var start = { x: -80, y: 34 };
	var end = { x: 31, y: 3 };
	var generator = new arc.GreatCircle(start, end, {'name': 'Seattle to DC'});
	var line = generator.Arc(100,{offset:10});

	coords = line.json();

	function reverse_coords(coords) {
		var new_coords = Array(coords.length);
		for(i = 0; i < coords.length; i++) {
			new_coords[i] = [coords[i][1], coords[i][0]]
		}
		return(new_coords);
	}

	var my_coords = reverse_coords(coords.geometry.coordinates);

	var plane_icon = L.icon({
		iconUrl: 'icons/plane_right.png',
		shadowIcon: null,
		iconSize: [45, 45]
	})

	function flight_path(callback) {
		var path = new L.Polyline(my_coords,
	            {snakingSpeed: 800, snakingPause: 0, color: "red", opacity: 1, weight: 1.00});
		path.addTo(map).snakeIn();

		var plane_marker = L.animatedMarker(my_coords, {icon: plane_icon, 
													  interval: 50,
													  });
		setTimeout(sling_plane(plane_marker), 5000);
	}
	
	function sling_plane(plane_marker) {
		map.addLayer(plane_marker);
	}

	flight_path(sling_plane);

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
});
  
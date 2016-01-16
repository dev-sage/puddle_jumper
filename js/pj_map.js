  var map = L.map("map", {zoomControl: false}).setView([39.00, -100.50], 5);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={accessToken}', {
              attribution: "",
              maxZoom: 9,
              mapid: 'mapbox.satellite',
              accessToken: 'pk.eyJ1IjoiZWxzYWdlIiwiYSI6ImNpamRwYWJrMzAwYWF1dW0wYjhodW94cWIifQ.VyG5_na-uMb7-G14DZgRlQ'
              }).addTo(map);


var Geodesic = L.geodesic([], {
    weight: 7, 
    opacity: 0.5,
    color: 'blue',
    steps: 50
}).addTo(map);
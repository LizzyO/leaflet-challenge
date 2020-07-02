//first: create the map
var myMap = L.map("map", {
    //centered in san francisco
    center: [37.09, -95.71],
    zoom: 5
  });
  
  //second: Add tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    //Third: grab API key for leaflet 
    accessToken: API_KEY
  }).addTo(myMap);
  
  //Fourth: call to the API
  // var jsonResponse = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  var jsonResponse = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

//twelve: Function that will determine the color of a magnitude it belongs to. Use color brewer to find colors for scale
function chooseColor(magnitude) {
    switch (true) {
    case magnitude <= 1 :
      return "#ffffb2";
    case magnitude <= 2 :
      return "#fed976";
    case magnitude <= 3 :
      return "#feb24c";
    case magnitude <= 4 :
      return "#fd8d3c";
    case magnitude <= 5 :
      return "#f03b20";
    case magnitude <= 6 :
      return '#bd0026';
    default:
      return "black";
    }
  }

  function getColor(color) {
    switch (true) {}
    "#ffffb2",
    "#fed976",
    "#feb24c",
    "#fd8d3c",
    "#f03b20",
    "#bd0026"
    };


//fifth: Grab our GeoJSON data..
d3.json(jsonResponse, function(data) {
//sixth: display the json
  console.log(data);

  //seven: Creating a geoJSON layer with the retrieved data
   L.geoJson(data, {
      //ten: anonym0ous function used to set style.
      style: function(feature) {
        return {
          color: "white",
          //thirteen: insert color function into fill color so that it can change color based on mag.
          fillColor: chooseColor(feature.properties.mag),
          // eleven: add radius and multiply to make it bigger and visible
          radius: feature.properties.mag*5,
          fillOpacity: 0.8,
          weight: 1.5
        };
      },
      //nine: markers are default. For circle follow leaflet for documentation
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
    },
    //eight: Called onEachFeature is built into Leaflet, add onEachFeature (do something for each feature we add) take both feature and layer as argument
    onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h2>" + feature.properties.mag + "</h2<hr><p>" + new Date(feature.properties.time) + "</p>");
        }
    }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    categories = ['0-1','1-2', '2-3','3-4', '4-5', '5+' ];

    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i class="circle" style="background-color:' + getColor(categories[i]) + '"></i> ' +
             (categories[i] ? categories[i] + '<br>' : '+');
    }
    return div;
  };
  
    // Add legend to map
    legend.addTo(myMap);

  });
  
  

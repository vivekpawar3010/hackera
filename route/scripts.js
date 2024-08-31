document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map with a default view
  const map = L.map("map").setView([0, 0], 2);

  // Add a tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Add a traffic density layer to the map
  const trafficLayer = L.tileLayer(
    "https://{s}.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}",
    {
      maxZoom: 18,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "© Google",
    }
  ).addTo(map);

  let userMarker, destinationMarker;

  // Function to update the map with the user's location
  function updateMap(latitude, longitude) {
    map.setView([latitude, longitude], 13);

    // Add or update marker at user's location
    if (userMarker) {
      userMarker.setLatLng([latitude, longitude]);
    } else {
      userMarker = L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("Your Location")
        .openPopup();
    }
  }

  // Function to get user's location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          updateMap(lat, lng);
        },
        function (error) {
          console.error("Error getting location: ", error);
          alert(
            "Unable to retrieve your location. Please allow location access in your browser."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // Function to find the destination city and update the map
  function findDestination() {
    const city = document.getElementById("destination").value;
    if (city) {
      geocode(city, (latLng, displayName) => {
        if (destinationMarker) {
          destinationMarker.setLatLng(latLng);
        } else {
          destinationMarker = L.marker(latLng)
            .addTo(map)
            .bindPopup(`Destination: ${displayName}`)
            .openPopup();
        }
        map.setView(latLng, 13);
        getRoute(
          [userMarker.getLatLng().lng, userMarker.getLatLng().lat],
          [latLng.lng, latLng.lat]
        );
      });
    } else {
      alert("Please enter a destination city.");
    }
  }

  // Function to geocode an address (city name) using OpenRouteService
  function geocode(cityName, callback) {
    const url = `https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf62484e378b6f24a94f839bc03d124e04c707&text=${encodeURIComponent(
      cityName
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.features && data.features.length > 0) {
          const result = data.features[0];
          const latLng = L.latLng(
            result.geometry.coordinates[1],
            result.geometry.coordinates[0]
          );
          callback(latLng, result.properties.label);
        } else {
          alert("City not found: " + cityName);
        }
      })
      .catch((error) => {
        console.error("Geocoding error:", error);
        alert("Failed to find the city.");
      });
  }

  // Function to get the route between two points using OpenRouteService
  function getRoute(start, end) {
    const apiKey = "5b3ce3597851110001cf62484e378b6f24a94f839bc03d124e04c707";
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.join(
      ","
    )}&end=${end.join(",")}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry.coordinates;
          const latlngs = route.map((coord) => [coord[1], coord[0]]); // Convert [lon, lat] to [lat, lon]
          L.polyline(latlngs, { color: "blue" }).addTo(map);
          map.fitBounds(L.polyline(latlngs).getBounds());
        } else {
          alert(
            "Failed to find the route. Response data: " + JSON.stringify(data)
          );
        }
      })
      .catch((error) => {
        console.error("Routing error:", error);
        alert("Failed to find the route. Error: " + error.message);
      });
  }

  // Attach events to the buttons
  document.getElementById("find").addEventListener("click", getLocation);
  document
    .getElementById("findDestination")
    .addEventListener("click", findDestination);
});

document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([0, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  let userMarker, destinationMarker;

  function updateMap(latitude, longitude) {
    map.setView([latitude, longitude], 13);

    if (userMarker) {
      userMarker.setLatLng([latitude, longitude]);
    } else {
      userMarker = L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("Your Location")
        .openPopup();
    }
  }

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
        if (userMarker) {
          getRoute(
            [userMarker.getLatLng().lng, userMarker.getLatLng().lat],
            [latLng.lng, latLng.lat]
          );
        } else {
          alert("Please find your location first.");
        }
      });
    } else {
      alert("Please enter a destination city.");
    }
  }

  function geocode(cityName, callback) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      cityName
    )}&limit=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const result = data[0];
          const latLng = L.latLng(result.lat, result.lon);
          callback(latLng, result.display_name);
        } else {
          alert("City not found: " + cityName);
        }
      })
      .catch((error) => {
        console.error("Geocoding error:", error);
        alert("Failed to find the city.");
      });
  }

  function getRoute(start, end) {
    const apiKey = "5b3ce3597851110001cf62484e378b6f24a94f839bc03d124e04c707";
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.join(
      ","
    )}&end=${end.join(",")}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.routes && data.routes[0]) {
          const route = data.routes[0].geometry;
          const decodedRoute = L.Polyline.decode(route);
          L.polyline(decodedRoute, { color: "blue" }).addTo(map);
        } else {
          alert("Failed to find the route.");
        }
      })
      .catch((error) => {
        console.error("Routing error:", error);
        alert("Failed to find the route. Error: " + error.message);
      });
  }

  document.getElementById("find").addEventListener("click", getLocation);
  document
    .getElementById("findDestination")
    .addEventListener("click", findDestination);

  // Handle City Distance Finder
  document.getElementById("findDistance").addEventListener("click", () => {
    const city1 = document.getElementById("city1").value;
    const city2 = document.getElementById("city2").value;
    if (city1 && city2) {
      geocode(city1, (latLng1, displayName1) => {
        geocode(city2, (latLng2, displayName2) => {
          L.marker(latLng1)
            .addTo(map)
            .bindPopup(`Start: ${displayName1}`)
            .openPopup();
          L.marker(latLng2)
            .addTo(map)
            .bindPopup(`End: ${displayName2}`)
            .openPopup();
          map.setView(latLng1, 13);
          getRoute([latLng1.lng, latLng1.lat], [latLng2.lng, latLng2.lat]);
        });
      });
    } else {
      alert("Please enter both start and end cities.");
    }
  });
});

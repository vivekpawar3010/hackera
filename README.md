## Alert Navigation System (Updated)

Modernized static web app combining a home slideshow, login/register, live map with routing, and current weather. This folder contains the updated UI and fixed navigation/function handling.

### Structure
- `Home Page/`: Landing page with slideshow and navbar
- `Login/`: Email/phone login form with validation and redirect
- `Register/`: Registration form (Firebase email/password example)
- `map/`: Leaflet map, geocoding (Nominatim), and routing (OpenRouteService)
- `Weather/`: Current weather via OpenWeatherMap

### Key Improvements
- Consistent navbars with relative links (works from local filesystem)
- Login success message and redirect (no auto-open windows)
- Map refactor: removed inline JS, robust route drawing with GeoJSON LineString
- Home slideshow responsive with improved overlay and aspect ratios

### Requirements
This is a static site. For best results, serve locally (prevents some browser CORS/geolocation limitations):

```bash
npx http-server -c-1 -p 5173 .
```

Or open `Home Page/home.html` directly in a browser (some features like geolocation may prompt/behave differently).

### API Keys and Config
- OpenWeatherMap: put your key in `Weather/Weather.js` (API_KEY variable)
- OpenRouteService: `map/script.js` uses the example key; replace with your own
- Nominatim Geocoding: public endpoint with usage policy (respect rate limits)
- Leaflet/OSM Tiles: public tiles; for production, consider a tile provider account
- Firebase (optional): `Register/register.html` includes example Firebase SDK config; replace with your own project values

### Optional: SMS Sending
To add SMS alerts, run a tiny backend using Twilio to keep credentials safe. Example server (Node + Express) and client usage were provided in discussion. Not enabled by default in this static build.

### Development
- Formatting: `npx prettier --write .`
- Local server: `npx http-server -c-1 -p 5173 .`

### Navigation
Start at `Home Page/home.html` and use the navbar links:
- Home → `Home Page/home.html`
- Weather → `Weather/Weather.html`
- Map → `map/index.html`
- Login → `Login/login.html`
- Register → `Register/register.html`

### Notes
- Geolocation requires allowing location in the browser.
- Routing requires an OpenRouteService API key; free plans have rate limits.
- Weather uses OpenWeatherMap, ensure API key is valid and not over rate limits.



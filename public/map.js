let tileProvider = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
// Alternative tile providers:
// - https://openmaptiles.org/
// - https://www.thunderforest.com/

let layerOptions = {
    minZoom: 4,
    maxZoom: 20,
    zoomDelta: 0.5,
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}

const map = L.map('map')

L.tileLayer(tileProvider, layerOptions).addTo(map);

map.attributionControl.setPrefix(
    '<a href="https://leafletjs.com/">Leaflet</a>'
);

map.locate({ setView: true, maxZoom: 16 });
// TODO: if permission denied, get location from IP address (3rd party API)
// - https://ipinfo.io/
// - https://ip-api.com/
// - https://iplocation.net/
// - https://geolocation.com/
// - https://ipgeolocation.io/
// - https://geolocation-db.com/

function onLocationFound(e) {
    var radius = e.accuracy;
    L.marker(e.latlng)
        .addTo(map)
        .bindPopup("Você está a " + radius + " metros desse ponto.")
        .openPopup();
    L.circle(e.latlng, radius)
        .addTo(map);
}

function onLocationError(e) {
    alert(e.message);
    // TODO: improve error design (e.g. show friendlier error message on map)
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

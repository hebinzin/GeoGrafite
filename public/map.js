import { artworks } from './artworks/artworks.js';

// Artwork marker
let pin = L.icon({
    iconUrl: './img/pin.png',
    iconAnchor: [14, 74],
    popupAnchor: [10, -50]
});

// User location marker
let me = L.icon({
    iconUrl: './img/me.png',
    iconAnchor: [25, 56.25],
    popupAnchor: [0, -38.5]
});

let tiles = {
    'osm': 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    'osmHOT': 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
}
// Other tile providers:
// - https://openmaptiles.org/
// - https://www.thunderforest.com/

let layerOptions = {
    minZoom: 4,
    maxZoom: 20,
    zoomDelta: 0.5,
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}

const map = L.map('map');

L.tileLayer(tiles.osmHOT, layerOptions).addTo(map);

map.attributionControl.setPrefix(
    '<a href="https://leafletjs.com/">Leaflet</a>'
);

map.locate({ setView: true });
// TODO: if permission denied, get location from IP address (3rd party API)
// - https://ipinfo.io/
// - https://ip-api.com/
// - https://iplocation.net/
// - https://geolocation.com/
// - https://ipgeolocation.io/
// - https://geolocation-db.com/


function onLocationFound(e) {
    let radius = e.accuracy;
    let unit = 'metros';
    let distance = Math.round(radius);

    if (radius > 1000 && radius < 10000) {
        unit = 'quilômetros';
        distance /= 1000;
    } else if (radius > 10000) {
        unit = 'mil quilômetros';
        distance /= 1000000;
    }
    L.marker(e.latlng, { icon: me })
        .addTo(map)
        .bindPopup(`Você está a ${distance} ${unit} desse ponto.`)
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

let markers = L.markerClusterGroup();

for (let artwork of artworks) {
    let popupContent = `<h2>${artwork.title}</h2><a href="${artwork.image}" target="_blank"><img src="${artwork.image}" width="200px"></a>`;
    let marker = L.marker(artwork.location, { icon: pin })
        .bindPopup(popupContent);
    markers.addLayer(marker);
};

map.addLayer(markers);
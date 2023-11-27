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
    popupAnchor: [0, -57]
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
    let unit;
    switch (true) {
        case (radius < 1000):
            unit = 'metros';
            break;
        case (radius < 10000):
            unit = 'quilômetros';
            distance = radius / 1000;
            break;
        default:
            unit = 'mil quilômetros';
            distance = radius / 1000000;
    }
    L.marker(e.latlng, { icon: me })
        .addTo(map)
        .bindPopup(`Você está a ${Math.round(radius)} ${unit} desse ponto.`)
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

for (let artwork of artworks) {
    let popupContent = `<h2>${artwork.title}</h2><img src="${artwork.image}" width="200px">`;
    L.marker(artwork.location, { icon: pin })
        .addTo(map)
        .bindPopup(popupContent);
};
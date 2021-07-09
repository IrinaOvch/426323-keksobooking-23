import { setActiveState, setAdressCoords } from './form.js';
import { fillPropertyOffer } from './render-offer.js';

const TileLayer = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
const TokyoCoords = {
  LAT: 35.6821594,
  LNG: 139.7447689,
};
const ZOOM_LEVEL = 13;
const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;

const dowloadErrorWindow = document.querySelector('#download-error').content.querySelector('.download-error').cloneNode(true);
const mapSection = document.querySelector('.map');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
});

const map = L.map('map-canvas');

const mainPin = L.marker(
  [TokyoCoords.LAT, TokyoCoords.LNG],
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderPins = (array, layerGroup) => {
  array.forEach((offer) => {
    const {lat, lng} = offer.location;
    const marker = L.marker({
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
    );
    marker
      .addTo(layerGroup)
      .bindPopup(
        fillPropertyOffer(offer),
        {
          keepInView: true,
        },
      );
  });
};

const setMap = (offers) => {
  map
    .on('load', setActiveState)
    .setView([TokyoCoords.LAT, TokyoCoords.LNG] , ZOOM_LEVEL);

  L.tileLayer(
    TileLayer.URL,
    {
      attribution: TileLayer.ATTRIBUTION,
    },
  ).addTo(map);
  const markerGroup = L.layerGroup().addTo(map);
  mainPin.addTo(map);

  mainPin.on('move', setAdressCoords);
  renderPins(offers, markerGroup);
};

const showDowloadErrorWindow = () => {
  mapSection.appendChild(dowloadErrorWindow);
};

const resetMap = () => {
  mainPin.setLatLng([TokyoCoords.LAT, TokyoCoords.LNG]);
  map.setView([TokyoCoords.LAT, TokyoCoords.LNG]);
};

export { setMap, mainPin, showDowloadErrorWindow, resetMap };

import { setActiveState, setAdressCoords } from './form.js';
import { setMapFilterClick, filterOffers } from './filter.js';
import { fillPropertyOffer } from './render-offer.js';
import { getData } from './api.js';
import { showDowloadErrorWindow } from './messages.js';
import { saveToStore, getFromStore } from './store.js';

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
const RENDERED_OFFERS_AMOUNT = 10;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
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
const markerGroup = L.layerGroup().addTo(map);

const renderPins = (array) => {
  markerGroup.clearLayers();
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
      .addTo(markerGroup)
      .bindPopup(
        fillPropertyOffer(offer),
        {
          keepInView: true,
        },
      );
  });
};

const onMapLoad = () => {
  setActiveState();
  getData((offers) => {
    saveToStore(offers);
    renderPins(offers.slice(0, RENDERED_OFFERS_AMOUNT));
    setMapFilterClick(offers);
  }, showDowloadErrorWindow);
};

const setMap = () => {
  map
    .on('load', onMapLoad)
    .setView([TokyoCoords.LAT, TokyoCoords.LNG] , ZOOM_LEVEL);

  L.tileLayer(
    TileLayer.URL,
    {
      attribution: TileLayer.ATTRIBUTION,
    },
  ).addTo(map);
  mainPin.addTo(map);

  mainPin.on('move', setAdressCoords);
};

const updatePins = (offers) => {
  const filteredOffers = filterOffers(offers);
  renderPins(filteredOffers);
};

const resetMap = () => {
  mainPin.setLatLng([TokyoCoords.LAT, TokyoCoords.LNG]);
  map.setView([TokyoCoords.LAT, TokyoCoords.LNG]);
  updatePins(getFromStore());
};

export { setMap, mainPin, resetMap, renderPins, updatePins };

import { setActiveState } from './form.js';
import {createPropertyOffers} from './mock-data.js';
import {fillPropertyOffer} from './render-offer.js';

const adressInput = document.querySelector('#address');

const TileLayer = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
const TokyoCoords = {
  LAT: 35.6821594,
  LNG: 139.7447689,
};
const DIGITS = 5;
const ZOOM_LEVEL = 13;
const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const OFFERS_AMOUNT = 10;

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

const mainPin = L.marker(
  [TokyoCoords.LAT, TokyoCoords.LNG],
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderPins = (array, map) => {
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
      .addTo(map)
      .bindPopup(
        fillPropertyOffer(offer),
        {
          keepInView: true,
        },
      );
  });
};

const mainPinMoveHandler = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  adressInput.value = `${lat.toFixed(DIGITS)}, ${lng.toFixed(DIGITS)}`;
};

const setMap = () => {
  const map = L.map('map-canvas')
    .on('load', setActiveState)
    .setView([TokyoCoords.LAT, TokyoCoords.LNG] , ZOOM_LEVEL);

  L.tileLayer(
    TileLayer.URL,
    {
      attribution: TileLayer.ATTRIBUTION,
    },
  ).addTo(map);
  mainPin.addTo(map);

  mainPin.on('move', mainPinMoveHandler);
  renderPins(createPropertyOffers(OFFERS_AMOUNT), map);
};

export {setMap};

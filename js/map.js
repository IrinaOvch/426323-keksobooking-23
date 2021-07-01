import { setActiveState } from './form.js';
import {createPropertyOffers} from './mock-data.js';
import {fillPropertyOffer} from './render-property-offers.js';

const TOKYO_COORDS = {
  lat: 35.6821594,
  lng: 139.7447689,
};
const ZOOM_LEVEL = 13;
const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const OFFERS_AMOUNT = 10;

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [MAIN_PIN_SIZE/2, MAIN_PIN_SIZE],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE/2, PIN_SIZE],
});

const mainPin = L.marker(
  TOKYO_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


const renderPins = (array, map) => {
  array.forEach(({author, offer, location}) => {
    const {lat, lng} = location;
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
        fillPropertyOffer({author, offer, location}),
        {
          keepInView: true,
        },
      );
  });
};

const mainPinMoveHandler = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  const adForm = document.querySelector('.ad-form');
  const adressInput = adForm.querySelector('#address');
  adressInput.value = `${lat}, ${lng}`;
};

const setMap = () => {
  const map = L.map('map-canvas')
    .on('load', setActiveState)
    .setView(TOKYO_COORDS, ZOOM_LEVEL);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  mainPin.addTo(map);

  mainPin.on('moveend', mainPinMoveHandler);
  renderPins(createPropertyOffers(OFFERS_AMOUNT), map);
};

export {setMap};

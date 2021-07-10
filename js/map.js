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
const ERROR_MESSAGE = 'При загрузке данных с сервера произошла ошибка, пожалуйста, перезагрузите страницу';

const mapSection = document.querySelector('.map');
const mapCanvas = document.querySelector('.map__canvas');

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

const renderPins = (array) => {
  const markerGroup = L.layerGroup().addTo(map);
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

const setMap = () => {
  map
    .on('load', setActiveState)
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

const showDowloadErrorWindow = () => {
  const downloadErrorAlert = document.createElement('p');
  downloadErrorAlert.style.position = 'absolute';
  downloadErrorAlert.style.zIndex = 2;
  downloadErrorAlert.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  downloadErrorAlert.style.width = '100%';
  downloadErrorAlert.style.color = 'white';
  downloadErrorAlert.style.fontSize = '24px';
  downloadErrorAlert.style.textAlign = 'center';
  downloadErrorAlert.style.padding = '15px 0';
  downloadErrorAlert.style.margin = '0';
  mapCanvas.style.zIndex = 1;

  downloadErrorAlert.textContent = ERROR_MESSAGE;

  mapSection.appendChild(downloadErrorAlert);
};

const resetMap = () => {
  mainPin.setLatLng([TokyoCoords.LAT, TokyoCoords.LNG]);
  map.setView([TokyoCoords.LAT, TokyoCoords.LNG]);
};

export { setMap, mainPin, showDowloadErrorWindow, resetMap, renderPins };

import {declOfNum} from './utils.js';

const propertyTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const ROOM_WORD_VARIATIONS = ['комната', 'комнаты', 'комнат'];
const GUEST_WORD_VARIATIONS = ['гостя', 'гостей', 'гостей'];

const mapContainer = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const fillPhotos = (container, photos) => {
  const photoElementEmpty = container.querySelector('.popup__photo');
  photoElementEmpty.remove();
  photos.forEach((photo) => {
    const photoElement = photoElementEmpty.cloneNode();
    photoElement.src = photo;
    container.appendChild(photoElement);
  });
};

const fillFeatures = (container, features) => {
  container.querySelectorAll('.popup__feature').forEach((child) => child.remove());
  const emptyFeatureElement = document.createElement('li');
  emptyFeatureElement.classList.add('popup__feature');
  features.forEach((feature) => {
    const featureElement = emptyFeatureElement.cloneNode();
    featureElement.classList.add(`popup__feature--${feature}`);
    container.appendChild(featureElement);
  });
};

const checkNode = (card) => {
  const nodes = card.children;
  Array.from(nodes).forEach((node) => {
    if (node.textContent.includes(undefined)) {
      node.remove();
    }

    if (node.nodeName === ('IMG') && node.src.length === 0) {
      node.remove();
    }
  });
};

const fillPropertyOffer = ({author, offer}) => {
  const newCard = cardTemplate.cloneNode(true);
  const {
    title,
    address,
    type,
    description,
    price,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    photos,
  } = offer;

  newCard.querySelector('.popup__title').textContent = title;
  newCard.querySelector('.popup__text--address').textContent = address;
  newCard.querySelector('.popup__type').textContent = propertyTypes[type];
  newCard.querySelector('.popup__description').textContent = description;
  newCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  newCard.querySelector('.popup__text--capacity').textContent = `${declOfNum(rooms, ROOM_WORD_VARIATIONS)} для ${declOfNum(guests, GUEST_WORD_VARIATIONS)} `;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  newCard.querySelector('.popup__avatar').src = author.avatar;

  const featuresList = newCard.querySelector('.popup__features');
  fillFeatures(featuresList, features);

  const photosContainer = newCard.querySelector('.popup__photos');
  fillPhotos(photosContainer, photos);

  return newCard;
};

const renderPropertyOffers = (array) => {
  const fragment = document.createDocumentFragment();
  array.forEach((arrayElement) => {
    const card = fillPropertyOffer(arrayElement);
    checkNode(card);
    fragment.appendChild(card);
  });
  mapContainer.appendChild(fragment);
};

export {renderPropertyOffers, fillPropertyOffer};

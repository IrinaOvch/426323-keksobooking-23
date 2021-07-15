import { getDeclOfNum } from './utils.js';

const propertyTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const ROOM_WORD_VARIATIONS = ['комната', 'комнаты', 'комнат'];
const GUEST_WORD_VARIATIONS = ['гостя', 'гостей', 'гостей'];

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const fillPhotos = (container, photos = []) => {
  const photoElementEmpty = container.querySelector('.popup__photo');
  photoElementEmpty.remove();

  if (photos.length === 0 ) {
    return;
  }

  photos.forEach((photo) => {
    const photoElement = photoElementEmpty.cloneNode();
    photoElement.src = photo;
    container.appendChild(photoElement);
  });
};

const fillFeatures = (container, features = []) => {
  container.innerHTML = '';
  if (features.length === 0 ) {
    return;
  }

  features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    container.appendChild(featureElement);
  });
};

const checkNodes = (card) => {
  const nodes = card.children;

  Array.from(nodes).forEach((node) => {
    if (node.textContent.includes(undefined)) {
      node.remove();
    }

    if (node.nodeName === ('IMG') && node.src.length === 0) {
      node.remove();
    }
  });

  return card;
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
  newCard.querySelector('.popup__text--capacity').textContent = `${getDeclOfNum(rooms, ROOM_WORD_VARIATIONS)} для ${getDeclOfNum(guests, GUEST_WORD_VARIATIONS)} `;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  newCard.querySelector('.popup__avatar').src = author.avatar;

  const featuresList = newCard.querySelector('.popup__features');
  fillFeatures(featuresList, features);

  const photosContainer = newCard.querySelector('.popup__photos');
  fillPhotos(photosContainer, photos);

  return checkNodes(newCard);
};

export { fillPropertyOffer };

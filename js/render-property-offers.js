const PROPERTY_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const container = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderPropertyOffer = ({author, offer}) => {
  const newCard = cardTemplate.cloneNode(true);

  const setValue = (value, selector, str) => {
    if (value) {
      newCard.querySelector(selector).textContent = str ? str : value;
    } else {
      newCard.querySelector(selector).setAttribute('hidden');
    }
  };

  const setTwoValues = (firstValue, secondValue, selector, str) => {
    if (firstValue && secondValue) {
      newCard.querySelector(selector).textContent = str;
    } else {
      newCard.querySelector(selector).setAttribute('hidden');
    }
  };

  setValue(offer.title, '.popup__title');
  setValue(offer.address, '.popup__text--address');
  setValue(PROPERTY_TYPES[offer.type], '.popup__type');
  setValue(offer.description, '.popup__description');
  setValue(offer.price, '.popup__text--price', `${offer.price} ₽/ночь`);
  setTwoValues(offer.rooms, offer.guests, '.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`);
  setTwoValues(offer.checkin, offer.checkout, '.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  if (!author.avatar) {
    newCard.querySelector('.popup__avatar').setAttribute('hidden');
  }
  newCard.querySelector('.popup__avatar').src = author.avatar;

  const featuresList = newCard.querySelector('.popup__features');
  const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);

  featuresList.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];
    if(!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  const photosContainer = newCard.querySelector('.popup__photos');
  const photoElementEmpty = newCard.querySelector('.popup__photo');
  photoElementEmpty.remove();
  if (!offer.photos) {
    photosContainer.setAttribute('hidden');
  }
  offer.photos.forEach((photo) => {
    const photoElement = photoElementEmpty.cloneNode(false);
    photoElement.src = photo;
    photosContainer.appendChild(photoElement);
  });

  container.appendChild(newCard);
};

const renderPropertyOffers = (array) => {
  array.forEach((arrayElement) => renderPropertyOffer(arrayElement));
};

export {renderPropertyOffer, renderPropertyOffers};

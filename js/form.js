import { sendData } from './api.js';
import { mainPin, resetMap } from './map.js';
import { handleEscKeydown, setSelectInitialValue, resetCheckboxes } from './utils.js';

const MIN_TITLE_LENGTH = 30;
const DIGITS = 5;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICES = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000,
};

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const offerTitleInput = adForm.querySelector('#title');
const descriptionInput = adForm.querySelector('#description');
const offerPriceInput = adForm.querySelector('#price');
const roomsAmountSelect = adForm.querySelector('#room_number');
const guestsAmountSelect = adForm.querySelector('#capacity');
const propertyTypeSelect = adForm.querySelector('#type');
const checkinTimeSelect = adForm.querySelector('#timein');
const checkoutTimeSelect = adForm.querySelector('#timeout');
const pageBody = document.querySelector('body');
const successWindow = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const formSubmitErrorWindow = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const tryAgainbutton = formSubmitErrorWindow.querySelector('.error__button');
const addressInput = document.querySelector('#address');
const formResetButton = document.querySelector('.ad-form__reset');

const guestsAmountOfRooms = {
  1: {
    guests: [1],
    getErrorText: (count) => `Максимум для ${count} гостя`,
  },
  2: {
    guests: [1, 2],
    getErrorText: (count) => `Максимум для ${count} гостей`,
  },
  3: {
    guests: [1, 2, 3],
    getErrorText: (count) => `Максимум для ${count} гостей`,
  },
  100: {
    guests: [0],
    getErrorText: () => 'Для 100 комнат можно выбрать только вариант "Не для гостей"',
  },
};

const disableFormFieldsets = (form) => {
  form.querySelectorAll('fieldset').forEach((field) => {
    field.disabled = true;
  });
};

const enableFormFieldsets = (form) => {
  form.querySelectorAll('fieldset').forEach((field) => {
    field.disabled = false;
  });
};

const setAdressCoords = () => {
  const {lat, lng} = mainPin.getLatLng();
  addressInput.value = `${lat.toFixed(DIGITS)}, ${lng.toFixed(DIGITS)}`;
};

const setInactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  disableFormFieldsets(adForm);
  mapForm.classList.add('ad-form--disabled');
  disableFormFieldsets(mapForm);
};

const setActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  enableFormFieldsets(adForm);
  mapForm.classList.remove('ad-form--disabled');
  enableFormFieldsets(mapForm);
  setAdressCoords();
};

const titleChangeHandler = (evt) => {
  const titleValueLength = evt.target.value.length;

  if (titleValueLength < MIN_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Требуется ввести ещё ${ MIN_TITLE_LENGTH - titleValueLength } симв.`);
  }

  if (titleValueLength > MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Удалите лишние ${ titleValueLength - MAX_TITLE_LENGTH } симв.`);
  }

  if (titleValueLength >= MIN_TITLE_LENGTH &&  titleValueLength <= MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity('');
  }

  offerTitleInput.reportValidity('');
};

const priceChangeHandler = () => {
  if (offerPriceInput.value > MAX_PRICE) {
    offerPriceInput.setCustomValidity(`Максимальная цена превышена на ${offerPriceInput.value - MAX_PRICE}₽`);
  } else if (offerPriceInput.value < MIN_PRICES[propertyTypeSelect.value]) {
    offerPriceInput.setCustomValidity(`Минимальная цена для данного типа жилья: ${MIN_PRICES[propertyTypeSelect.value]}₽`);
  } else {
    offerPriceInput.setCustomValidity('');
  }

  offerPriceInput.reportValidity('');
};

const guestsAmountChangeHandler = () => {
  const roomsValue = Number(roomsAmountSelect.value);
  const guestsValue = Number(guestsAmountSelect.value);

  if (!guestsAmountOfRooms[roomsValue].guests.includes(guestsValue)) {
    const guests = guestsAmountOfRooms[roomsValue].guests.join(', ');
    guestsAmountSelect.setCustomValidity(guestsAmountOfRooms[roomsValue].getErrorText(guests));
  } else {
    guestsAmountSelect.setCustomValidity('');
  }

  guestsAmountSelect.reportValidity();
};

const resetForm = () => {
  offerTitleInput.value = '';
  offerPriceInput.value = '';
  descriptionInput.value = '';
  setSelectInitialValue(roomsAmountSelect);
  setSelectInitialValue(guestsAmountSelect);
  setSelectInitialValue(propertyTypeSelect);
  setSelectInitialValue(checkinTimeSelect);
  setSelectInitialValue(checkoutTimeSelect);
  resetMap();
  setAdressCoords();
  resetCheckboxes('feature');
};

const housingTypeChangeHandler = (evt) => {
  const housingTypeValue = evt.target.value;
  offerPriceInput.placeholder = MIN_PRICES[housingTypeValue];
};

const chechinTimeChangeHandler = (evt) => {
  checkoutTimeSelect.value = evt.target.value;
  checkinTimeSelect.value = evt.target.value;
};

const hideFormSubmitAlert = () => {
  pageBody.removeChild(formSubmitErrorWindow);
};

const hideSuccessWindow = () => {
  pageBody.removeChild(successWindow);
  window.removeEventListener('click', hideSuccessWindow);
  resetForm();
};

const showSuccessWindow = () => {
  pageBody.appendChild(successWindow);
  window.addEventListener('keydown', handleEscKeydown(hideSuccessWindow));
  window.addEventListener('click', hideSuccessWindow);
};

const showFormSubmitAlert = () => {
  pageBody.appendChild(formSubmitErrorWindow);
  tryAgainbutton.addEventListener('click', hideFormSubmitAlert);
  window.addEventListener('keydown', handleEscKeydown(hideFormSubmitAlert));
};

const formResetButtonClickHandler = (evt) => {
  evt.preventDefault();
  resetForm();
  // resetFilter();
  // will be added soon
};

const setOfferFormSubmit = () => {

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    guestsAmountChangeHandler();
    priceChangeHandler();

    if (adForm.checkValidity()) {
      sendData(
        showSuccessWindow,
        showFormSubmitAlert,
        new FormData(evt.target),
      );
    }
  };

  adForm.addEventListener('submit', formSubmitHandler);
};

const setFormListeners = () => {
  offerTitleInput.addEventListener('change', titleChangeHandler);
  offerPriceInput.addEventListener('change', priceChangeHandler);
  guestsAmountSelect.addEventListener('change', guestsAmountChangeHandler);
  propertyTypeSelect.addEventListener('change', housingTypeChangeHandler);
  checkinTimeSelect.addEventListener('change', chechinTimeChangeHandler);
  checkoutTimeSelect.addEventListener('change', chechinTimeChangeHandler);
  formResetButton.addEventListener('click', formResetButtonClickHandler);
};

export { setInactiveState, setActiveState, setFormListeners, setOfferFormSubmit, setAdressCoords };

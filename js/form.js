const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const offerTitleInput = document.querySelector('#title');
const offerPriceInput = document.querySelector('#price');
const roomsAmountSelect = document.querySelector('#room_number');
const guestsAmountSelect = document.querySelector('#capacity');

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

const formSubmitHandler = (evt) => {
  guestsAmountChangeHandler();

  if (!adForm.checkValidity()) {
    evt.preventDefault();
  }
};

const setFormListeners = () => {
  offerTitleInput.addEventListener('change', titleChangeHandler);
  offerPriceInput.addEventListener('change', priceChangeHandler);
  guestsAmountSelect.addEventListener('change', guestsAmountChangeHandler);
  adForm.addEventListener('submit', formSubmitHandler);
};

export {setInactiveState, setActiveState, setFormListeners};

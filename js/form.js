const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MAX_GUESTS_AMOUNT = 100;
const NO_GUESTS = 0;

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const offerTitleInput = document.querySelector('#title');
const offerPriceInput = document.querySelector('#price');
const roomsAmountInput = document.querySelector('#room_number');
const guestsAmountInput = document.querySelector('#capacity');
const notForGuestsOption = guestsAmountInput.querySelector(`option[value="${NO_GUESTS}"]`);


const guestsAmountOfRooms = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
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
  notForGuestsOption.setAttribute('disabled', 'disabled');
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

const roomsAmountChangeHandler = () => {
  if (Number(roomsAmountInput.value) === MAX_GUESTS_AMOUNT) {
    notForGuestsOption.removeAttribute('disabled', 'disabled');
  } else {
    notForGuestsOption.setAttribute('disabled', 'disabled');
  }
};

const guestsAmountChangeHandler = () => {
  const roomsValue = Number(roomsAmountInput.value);
  const guestsValue = Number(guestsAmountInput.value);

  if (!guestsAmountOfRooms[roomsValue].includes(guestsValue)) {
    if (roomsValue === MAX_GUESTS_AMOUNT) {
      guestsAmountInput.setCustomValidity(`Для ${MAX_GUESTS_AMOUNT} комнат можно выбрать только вариант "Не для гостей"`);
    } else {
      guestsAmountInput.setCustomValidity('Количество гостей не должно превышать количество комнат');
    }
  } else {
    guestsAmountInput.setCustomValidity('');
  }
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
  roomsAmountInput.addEventListener('change', roomsAmountChangeHandler);
  roomsAmountInput.addEventListener('change', guestsAmountChangeHandler);
  guestsAmountInput.addEventListener('change', guestsAmountChangeHandler);
  adForm.addEventListener('submit', formSubmitHandler);
};

export {setInactiveState, setActiveState, setFormListeners};

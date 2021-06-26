const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const offerTitleInput = document.querySelector('#title');
const offerPriceInput = document.querySelector('#price');
const roomsAmountInput = document.querySelector('#room_number');
const guestsAmountInput = document.querySelector('#capacity');


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


const checkTitle = () => {
  const titleValueLength = offerTitleInput.value.length;

  if (titleValueLength < MIN_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Требуется ввести ещё ${ MIN_TITLE_LENGTH - titleValueLength } симв.`);
  }

  if (titleValueLength > MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Удалите лишние ${ titleValueLength - MAX_TITLE_LENGTH } симв.`);
  }

  if (titleValueLength >= MIN_TITLE_LENGTH &&  titleValueLength <= MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity('');
  }

};

const checkOfferPriceInput = () => {
  const offerPricevalue = offerPriceInput.value;

  if (offerPricevalue > MAX_PRICE) {
    offerPriceInput.setCustomValidity(`Максимальная цена превышена на ${offerPricevalue - MAX_PRICE}₽`);
  }

  if (offerPricevalue <= MAX_PRICE) {
    offerPriceInput.setCustomValidity('');
  }
};

const checkGuestsValue = () => {
  const roomsValue = Number(roomsAmountInput.value);
  const guestsValue = Number(guestsAmountInput.value);

  if (guestsValue > roomsValue) {
    guestsAmountInput.setCustomValidity('Количество гостей не должно превышать количество комнат');
  } else if (roomsValue === 100 && guestsValue !== 0) {
    guestsAmountInput.setCustomValidity(`Для ${roomsValue} комнат можно выбрать только вариант "Не для гостей"`);
  } else if (roomsValue !== 100 && guestsValue === 0) {
    guestsAmountInput.setCustomValidity('Вариант "Не для гостей" доступен только для 100 комнат');
  } else {
    guestsAmountInput.setCustomValidity('');
  }
};

offerTitleInput.addEventListener('input', checkTitle);
offerPriceInput.addEventListener('input', checkOfferPriceInput);
roomsAmountInput.addEventListener('input', checkGuestsValue);
guestsAmountInput.addEventListener('input', checkGuestsValue);

adForm.addEventListener('submit', (evt) => {
  checkGuestsValue();

  if (!guestsAmountInput.validity.valid) {
    evt.preventDefault();
  }
});


export {setInactiveState, setActiveState};

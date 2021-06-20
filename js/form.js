const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

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

export {setInactiveState, setActiveState};

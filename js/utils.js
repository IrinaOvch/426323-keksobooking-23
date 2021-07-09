const getRandomPositiveFloat = (firstNumber, secondNumber, digits = 1) => {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArrayElements = (elements) => {
  const result = [];

  for (let i = 0; i <= getRandomPositiveInteger(1, elements.length - 1); i++) {
    const item = elements[getRandomPositiveInteger(0, elements.length - 1)];
    if (!result.includes(item)) {
      result.push(item);
    }
  }

  return result;
};

const getDeclOfNum = (number, words) => `${number} ${words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]]}`;

const handleEscKeydown = (cb) => (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    cb();
    window.removeEventListener('keydown', cb);
  }
};

const setSelectInitialValue = (select) => {
  const selectInitialValue = select.querySelector('option[selected]').value;
  select.value = selectInitialValue;
};

const resetCheckboxes = (name) => {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

export { getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, getRandomArrayElements, getDeclOfNum, handleEscKeydown, setSelectInitialValue, resetCheckboxes };

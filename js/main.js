const getRandomNumber = (min, max) => {
  if (min >= max) {
    throw new Error('Введены некорректные значения, минимальное значение должно быть меньше максимального.');
  }
  if (min < 0) {
    throw new Error('Введены некорректные значения, диапазон может быть только положительный, включая 0.');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomNumber(4, 7);

// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomFloatNumber = (min, max, numberOfDecimals) => {
  if (min >= max) {
    throw new Error('Введены некорректные значения, минимальное значение должно быть меньше максимального.');
  }
  if (min < 0) {
    throw new Error('Введены некорректные значения, диапазон может быть только положительный, включая 0.');
  }

  return +(Math.random() * (max - min) + min).toFixed(numberOfDecimals);
};

getRandomFloatNumber(1.2, 1.4, 4);

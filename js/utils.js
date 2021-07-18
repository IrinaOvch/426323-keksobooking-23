const DOBOUNCE_DELAY = 500;

const getDeclOfNum = (number, words) => `${number} ${words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]]}`;

const debounce = (callback, timeoutDelay = DOBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { getDeclOfNum, debounce, isEscPressed };

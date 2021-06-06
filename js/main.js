const PROPERTIES_AMOUNT = 10;
const MAX_ROOMS_AMOUNT = 10;
const MAX_PRICE = 1000000;
const MAX_GUESTS_AMOUNT = 30;

const TITLES = [
  'Уютная двушка в центре',
  'Компактная студия близко к метро',
  'Роскошная вилла на берегу озера',
  'Мини вилла в лесу',
  'Квартира в современном комплексе с подземным паргкингом',
  'Бунгало для двоих',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKINS_AND_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Уютная квартира, расположена в ста метрах от метро, в молодежном районе. Вокруг много магазинов, спортзал и пекарни.',
  'Маленькая студия, отлично подойдет для студентов, оснащена всем необходимым. Метро рядом, также недалеко расположен парк.',
  'Отличный вариант для семьи, 3 спальни, 2 санузла. Вся инфраструктура в пешей доступности: детский сад, школа, две больницы',
  'Вилла в лесу отличный вариант для тех кто устал от города, все удобства есть.',
  'Роскошная вилла отлично подойдет тем, кто хочет показать свой статус. В цену входят услуги дворецкого',
  'Компактная двушка, идеальна для молодой пары, недалеко от центра. Радом расположен торговый центр, множество ресторанов и кафе',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getRandomPositiveInteger (firstNumber, secondNumber) {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat (firstNumber, secondNumber, digits = 1) {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArrayElements = (elements) => {
  const result = [];
  for (let iteration = 0; iteration <= getRandomPositiveInteger(1, elements.length - 1); iteration++) {
    const item = elements[getRandomPositiveInteger(0, elements.length - 1)];
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
};

const createProperty = (iter) => ({
  author: {
    avatar: `img/avatars/user${iter}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${getRandomPositiveFloat(0, 90, 5)}, ${getRandomPositiveFloat(0, 180, 5)}`,
    price: getRandomPositiveInteger(0, MAX_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(0, MAX_ROOMS_AMOUNT),
    guests: getRandomPositiveInteger(0, MAX_GUESTS_AMOUNT),
    checkin: getRandomArrayElement(CHECKINS_AND_CHECKOUTS),
    checkout: getRandomArrayElement(CHECKINS_AND_CHECKOUTS),
    features: getRandomArrayElements(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomArrayElements(PHOTOS),
  },
  location: {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  },
});


const properties = new Array(PROPERTIES_AMOUNT).fill(null).map(( val, iter) => {
  iter = iter + 1;
  if (iter < 10) {
    iter = `0${iter}`;
  }
  return createProperty(iter);
});

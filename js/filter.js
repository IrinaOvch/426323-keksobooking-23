const MAX_PRICE = 1000000;
const priceRanges = {
  low: {
    MIN: 0,
    MAX: 9999,
  },
  middle: {
    MIN: 10000,
    MAX: 49999,
  },
  high: {
    MIN: 50000,
    MAX: MAX_PRICE,
  },
};

const mapFilter = document.querySelector('.map__filters');

const isPriceInRange = (price, range) => {
  if (range === 'any') {
    return true;
  }

  if (price > priceRanges[range].MIN && price < priceRanges[range].MAX) {
    return true;
  }

  return false;
};

const housingTypeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsAmountFilter = mapFilter.querySelector('#housing-rooms');
const guestsAmountFilter = mapFilter.querySelector('#housing-guests');
const featuresFilter = mapFilter.querySelector('#housing-features');

const getFeatures = () => {
  const checkedFeatures = [];
  featuresFilter.querySelectorAll('input[type="checkbox"]:checked').forEach((feature) => {
    if (feature.checked === true) {
      checkedFeatures.push(feature.value);
    }
  });
  return checkedFeatures;
};

const isValueFitsFilter = ( property, filter) => {
  let filterValue = filter.value;
  if (filterValue !== 'any' && filter !== housingTypeFilter) {
    filterValue = Number(filter.value);
  }
  if (filterValue === 'any' || property === filterValue) {
    return true;
  }
  return false;
};

const isFeaturesFitFilter = (features = []) => {
  const filteredFeatures = getFeatures();

  for ( let i = 0; i < filteredFeatures.length; i++) {
    if (!features.includes(filteredFeatures[i])) {
      return false;
    }
  }

  return true;
};

const filterOffers = ({offer}) => {
  const {type, price, rooms, guests, features} = offer;
  if (
    isValueFitsFilter(type, housingTypeFilter) &&
    isPriceInRange(price, priceFilter.value)&&
    isValueFitsFilter(rooms, roomsAmountFilter)&&
    isValueFitsFilter(guests, guestsAmountFilter)&&
    isFeaturesFitFilter(features)
  ) {
    return true;
  }

  return false;
};

const setMapFilterClick = (cb) => {
  mapFilter.addEventListener('change', cb);
};


export { mapFilter, setMapFilterClick, filterOffers };

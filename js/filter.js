import { updatePins } from './map.js';
import { debounce } from './utils.js';
import { enableFormFieldsets } from './form.js';

const MAX_PRICE = 1000000;
const RENDERED_OFFERS_AMOUNT = 10;
const FILTER_VALUE_ANY = 'any';
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
const housingTypeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsAmountFilter = mapFilter.querySelector('#housing-rooms');
const guestsAmountFilter = mapFilter.querySelector('#housing-guests');
const featuresFilter = mapFilter.querySelector('#housing-features');

const enableFilterForm = () => {
  mapFilter.classList.remove('ad-form--disabled');
  enableFormFieldsets(mapFilter);
};

const isPriceInRange = (price, range) => {
  if (range === FILTER_VALUE_ANY) {
    return true;
  }

  return price > priceRanges[range].MIN && price < priceRanges[range].MAX;
};

const isValueMatchesFilter = ( property, filter) => {
  let filterValue = filter.value;
  if (filterValue !== FILTER_VALUE_ANY && filter !== housingTypeFilter) {
    filterValue = Number(filter.value);
  }

  return filterValue === FILTER_VALUE_ANY || property === filterValue;
};

const areFeaturesMatchFilter = (features = []) => {
  const filteredFeatures = featuresFilter.querySelectorAll('input[type="checkbox"]:checked');
  return [...filteredFeatures].every((feature) => features.includes(feature.value));
};

const isOfferMatchesFilter = (offer) => {
  const {type, price, rooms, guests, features} = offer;
  return isValueMatchesFilter(type, housingTypeFilter)&&
  isPriceInRange(price, priceFilter.value)&&
  isValueMatchesFilter(rooms, roomsAmountFilter)&&
  isValueMatchesFilter(guests, guestsAmountFilter)&&
  areFeaturesMatchFilter(features);
};

const filterOffers = (offers) => {
  const filteredOffers = [];
  for (let i = 0; i < offers.length && filteredOffers.length < RENDERED_OFFERS_AMOUNT; i++) {
    const {offer} = offers[i];
    if (isOfferMatchesFilter(offer)) {
      filteredOffers.push(offers[i]);
    }
  }
  return filteredOffers;
};

const setMapFilterClick = (data) => {
  mapFilter.addEventListener('change', debounce(() => updatePins(data)));
};

export { setMapFilterClick, filterOffers, enableFilterForm };

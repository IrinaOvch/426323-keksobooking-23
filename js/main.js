import { setInactiveState, setFormListeners, setOfferFormSubmit } from './form.js';
import { setMap, showDowloadErrorWindow } from './map.js';
import { getData } from './api.js';

setInactiveState();
setFormListeners();
getData(setMap, showDowloadErrorWindow);
setOfferFormSubmit();

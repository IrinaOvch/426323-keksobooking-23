import { setInactiveState, setFormListeners } from './form.js';
import { setMap, showDowloadErrorWindow, renderPins } from './map.js';
import { getData } from './api.js';

setInactiveState();
setFormListeners();
setMap();
getData(renderPins, showDowloadErrorWindow);

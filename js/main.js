import {createPropertyOffers} from './mock-data.js';
import {renderPropertyOffers} from './render-property-offers.js';
import {setInactiveState, setActiveState, setFormListeners} from './form.js';

renderPropertyOffers(createPropertyOffers());
setInactiveState();
setActiveState();
setFormListeners();

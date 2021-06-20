import {createPropertyOffers} from './mock-data.js';
import {renderPropertyOffers} from './render-property-offers.js';
import {setInactiveState, setActiveState} from './form.js';

renderPropertyOffers(createPropertyOffers());
setInactiveState();
setActiveState();

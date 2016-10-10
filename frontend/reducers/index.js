import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import snaps from './snaps';
import activeModal from './activeModal';
import availableDates from './availableDates';
import selectedDay from './selectedDay';

const rootReducer = combineReducers({
	activeModal,
	snaps,
	availableDates,
	selectedDay,
	routing: routerReducer
});

export default rootReducer;

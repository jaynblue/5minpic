import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const routsMiddleware = routerMiddleware(browserHistory);

const defaultState = {
	activeModal: null,
	snaps: [],
	availableDates: {},
	selectedDay: {
		date: new Date().toDateString()
	}
};

const store = createStore(
	rootReducer,
	defaultState,
	compose(
		applyMiddleware(sagaMiddleware, routsMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : fn => fn
	)
);

sagaMiddleware.run(rootSaga);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

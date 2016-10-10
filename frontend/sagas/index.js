import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from '../api';

import {
	requestData,
	receiveData,
	dataReceiveError
} from '../actions';

function* onDataRequest({ payload }) {
	try {
		const data = yield call(api.fetchData, { date: payload.date });

		yield put(receiveData(data));
	} catch (error) {
		yield put(dataReceiveError(error));
		/* eslint-disable */
        console.error(error);
        /* eslint-enable */
	}
}

function* onChangeCurrentDate({ payload }) {
	yield put(push('/'));
	yield put(requestData(payload));
}

function* watchDataRequest() {
	yield *takeLatest('REQUEST_DATA', onDataRequest);
}

function* watchChangeCurrentDate() {
	yield *takeLatest('CHANGE_CURRENT_DATE', onChangeCurrentDate);
}

function* rootSaga() {
	yield [
		watchDataRequest(),
		watchChangeCurrentDate()
	];
}

export default rootSaga;

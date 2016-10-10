export function requestData(payload) {
	return {
		type: 'REQUEST_DATA',
		payload
	};
}

export function receiveData(payload) {
	return {
		type: 'DATA_RECEIVED',
		payload
	};
}

export function dataReceiveError(payload) {
	return {
		type: 'DATA_RECEIVE_ERROR',
		error: true,
		payload
	};
}

export function changeCurrentDate(payload) {
	return {
		type: 'CHANGE_CURRENT_DATE',
		payload
	};
}

export function showModal(payload) {
	return {
		type: 'SHOW_MODAL',
		payload
	};
}

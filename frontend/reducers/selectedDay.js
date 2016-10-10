export default function(selectedDay = null, { type, payload, error }) {
	switch (type) {
		case 'CHANGE_CURRENT_DATE':
			return {
				...selectedDay,
				...payload
			};
	}

	return selectedDay;
}

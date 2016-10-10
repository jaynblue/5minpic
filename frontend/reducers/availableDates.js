export default function(availableDates = [], { type, payload, error }) {
	switch (type) {
		case 'DATA_RECEIVED': return {
			...availableDates,
			...payload.availableDates
		};
	}

	return availableDates;
}

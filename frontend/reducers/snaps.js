export default function(snaps = [], { type, payload, error }) {

	switch (type) {
		case 'DATA_RECEIVED':
			return [].concat(payload.todayImages);
	}

	return snaps;
}

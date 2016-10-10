export default function(activeModal = null, { type, payload, error }) {
	switch (type) {
		case 'SHOW_MODAL': return payload.modalId;
	}

	return activeModal;
}

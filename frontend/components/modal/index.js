import Modal from './component';
import { showModal } from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		activeModal: state.activeModal
	};
};

const mapDispatchToProps = dispatch => {
	return {
		openModal(id) {
			dispatch(showModal({ modalId: id }));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

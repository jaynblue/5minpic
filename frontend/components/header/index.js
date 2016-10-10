import Header from './component';
import { showModal } from '../../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
	return {
		openModal(id) {
			dispatch(showModal({ modalId: id }));
		}
	};
};

const mapStateToProps = (state) => {
	const location = state.routing.locationBeforeTransitions ?
		state.routing.locationBeforeTransitions.pathname : null;

	return {
		location
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

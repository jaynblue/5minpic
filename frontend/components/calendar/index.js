import { connect } from 'react-redux';
import store from '../../store.js';
import AppComponent from './component';
import { changeCurrentDate } from '../../actions';

const mapStateToProps = state => {
	return {
		availableDates: state.availableDates,
		selectedDay: state.selectedDay
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onDayClick(e, chosenDate, modifiers) {
			const { date } = store.getState().selectedDay;
			const day = chosenDate.toDateString();

			if (day === date || modifiers.indexOf('selected') !== -1 ||
				modifiers.indexOf('isDisabled') !== -1) {
				return;
			}
			dispatch(changeCurrentDate({ date: day }));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);

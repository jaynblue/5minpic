import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppComponent from './component';
import { requestData } from '../../actions';

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ requestData }, dispatch);
};

const mapStateToProps = state => {
	return {
		snaps: state.snaps,
		selectedDay: state.selectedDay
	};
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;

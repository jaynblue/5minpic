import React from 'react';
import Header from '../header';
import Footer from '../footer';
// import request from 'superagent';

import './styles.css';

export default class App extends React.Component {

	static propTypes = {
		availableDates: React.PropTypes.object,
		requestData: React.PropTypes.func,
		selectedDay: React.PropTypes.string,
		snaps: React.PropTypes.array
	}

	defaultProps = {
		snaps: null,
		selectedDay: new Date().toDateString()
	}

	componentDidMount() {
		this.props.requestData({ date: this.props.selectedDay });
	}

	render() {

		if (this.props.snaps === null) {
			return (
				<div className="app app_loading">
					Loading... Please wait
				</div>
			);
		}

		if (this.props.snaps.length === 0) {
			return (
				<div className="app">
					<Header word="Sorry.." />
					<div className="app_message">
						There is no images for today<br/>
						Please try another date
					</div>
					<Footer />
				</div>
			);
		}

		return (
			<div className="app">
				<Header />
				<div className="main">
					{React.cloneElement(
						this.props.children,
						{ ...this.props, key: 'undefined', ref: 'undefined' }
					)}
				</div>
				<Footer />
			</div>
		);
	}
}

import React from 'react';
import Snap from '../snap';

import './style.css';

 export default class SingleSnap extends React.Component {

	static propTypes = {
		params: React.PropTypes.object,
		snaps: React.PropTypes.array
	}

	render() {
		const { snapId } = this.props.params;

		const snap = this.props.snaps.find(el => el.word === snapId);

		return (
			<div className="single-snap">
				<Snap {...snap} single={true} />
			</div>
		);
	}
}

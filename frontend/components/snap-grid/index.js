import React from 'react';
import Snap from '../snap';
import { Link } from 'react-router';

import './style.css';

export default class SnapGrid extends React.Component {

	static propTypes = {
		snaps: React.PropTypes.array
	}

	render() {
		return (
			<div className="snap-grid">
				{ this.props.snaps.map((snap, i) =>
					<div className="snap-grid__item" key={i}>
						<Link to={`snap/${snap.word}`} className="snap__link">
							<Snap {...snap} key={i} i={i} />
						</Link>
					</div>
				)}
			</div>
		);
	}
}

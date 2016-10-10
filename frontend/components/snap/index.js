import React from 'react';

import './style.css';

export default class Snap extends React.Component {

	static propTypes = {
		min_path: React.PropTypes.string,
		path: React.PropTypes.string,
		single: React.PropTypes.bool,
		word: React.PropTypes.string
	}

	renderHeader() {
		return (
			<h1 className="snap__header">
				{this.props.word}
			</h1>
		);
	}

	renderCaption() {
		return (
			<div className="snap__caption">
				{this.props.word}
			</div>
		);
	}

	render() {
		const { path, min_path, word } = this.props;

		return (
			<div className="snap">
				{this.props.single ? this.renderHeader() : ''}
				<div>
					<img
						src={this.props.single ? path : min_path}
						alt={word}
						className="snap__image"
						/>
				</div>
				{this.props.single ? '' : this.renderCaption()}
			</div>
		);
	}
}

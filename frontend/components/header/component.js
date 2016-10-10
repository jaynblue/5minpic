import React from 'react';
import { Link } from 'react-router';
import Modal from '../modal';

import Calendar from '../calendar';

import './styles.css';

export default class Header extends React.Component {

	static propTypes = {
		openModal: React.PropTypes.func,
		startTime: React.PropTypes.string,
		location: React.PropTypes.string,
		word: React.PropTypes.string
	}

	render() {
		return (
			<div className="header">
				<div className="header__inner">
					<Link to="/">
						<div className="header__logo">
							<span className="header__vam-helper" />
							<img src={require('../../assets/logo.svg')} />
						</div>
						<div className="header__word">
							<div className="main-word">
								<span className="main-word__word">
									Snap
								</span>
							</div>
						</div>
					</Link>
					<div
						className="header__about"
						onClick={this.props.openModal.bind(this, 'about')}
						>
						about
					</div>
					<div className="header__calendar">
						<span className="header__vam-helper" />
						<Calendar />
					</div>
					<Modal id="about" title="Hello there!" className="header__about-content">
						<p>Welcome to the 5Snap!</p>
						<p>It is an autoupdating image gallery made just for fun.</p>
						<p>What it does - it captures new random image every 5 minutes.</p>
						<p>Every image is a snapshot of a random video.</p>
						<p>Sometimes they are very funny.</p>
						<br/>
						<p>If you like it, you can drop me a message here:</p>

						<div className="social">
							<a href="https://www.facebook.com/makoffd" target="_blank">
								<img width="30" src={require('../../assets/facebook.svg')} />
							</a>
							<a href="https://twitter.com/mak0ffd" target="_blank">
								<img width="30" src={require('../../assets/twitter.svg')} />
							</a>
						</div>
					</Modal>
				</div>

			</div>

		);
	}
}

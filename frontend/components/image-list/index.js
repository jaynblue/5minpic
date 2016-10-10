import React from 'react';
import ReactDOM from 'react-dom';
import MainImage from '../main-image';
import '../image-list/styles.css';

const SHOW_NUM = 5;
const TO_BOTTOM = 100;

export default class ImageList extends React.Component {

	state = {
		photosToShow: SHOW_NUM
	}

	componentDidMount = () => {
		this.attachScrollListener();
	}

	componentDidUpdate = () => {
		this.attachScrollListener();
	}

	componentWillUnmount = () => {
		this.detachScrollListener();
	}

	resetStartState = () => {
		this.detachScrollListener();
		window.scrollTo(0, 0);
		this.setState({
			photosToShow: SHOW_NUM
		});
	}

	updateNumberToShow = () => {
		this.setState({
			photosToShow: this.state.photosToShow + SHOW_NUM
		});
	}

	attachScrollListener = () => {
		if (this.state.photosToShow >= this.props.data.length) {
			return;
		}
		window.addEventListener('scroll', this.scrollListener);
		window.addEventListener('resize', this.scrollListener);
	}

	detachScrollListener = () => {
		window.removeEventListener('scroll', this.scrollListener);
		window.removeEventListener('resize', this.scrollListener);
	}

	scrollListener = () => {
		let scrollTop = 0;

		function topPosition(domElt) {
			return (domElt) ? domElt.offsetTop + topPosition(domElt.offsetParent) : 0;
		}
		const el = ReactDOM.findDOMNode(this);

		if (typeof window.pageYOffset === 'undefined') {
			scrollTop = (
				document.documentElement ||
				document.body.parentNode ||
				document.body
			).scrollTop;
		} else {
			scrollTop = window.pageYOffset;
		}

		if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < TO_BOTTOM) {
			this.detachScrollListener();
			this.updateNumberToShow();
		}
	}

	render() {
		const showData = this.props.data.slice(0, this.state.photosToShow);

		return (
			<div className="image-list">
				{showData.map((image, index) => {
					return <MainImage image={image} key={index} />;
				})}
			</div>
		);
	}

}

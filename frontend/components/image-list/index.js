import React from 'react';
import ReactDOM from 'react-dom';
import MainImage from '~/components/main-image';
import '~/components/image-list/styles.css';

const SHOW_NUM = 5;
const TO_BOTTOM = 100;

export default class ImageList extends React.Component {

	state = {
		photosToShow: SHOW_NUM
	}

	resetStartState = () => {
		this.detachScrollListener();
		window.scrollTo(0,0);
		this.setState({
			photosToShow: SHOW_NUM
		});
	}

	updateNumberToShow = () => {
		this.setState({
			photosToShow: this.state.photosToShow + SHOW_NUM
		});
	}

	componentDidMount = () => {
		this.attachScrollListener();
	}

	componentDidUpdate = () => {
		this.attachScrollListener();
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

	componentWillUnmount = () => {
		this.detachScrollListener();
	}

	scrollListener = () => {
		function topPosition(domElt) {
		  return (!domElt) ? 0 : domElt.offsetTop + topPosition(domElt.offsetParent);
		}
		var el = ReactDOM.findDOMNode(this);
		var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
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
						return <MainImage image={image}  key={index} />;
					})}
			</div>
		);
	}

}

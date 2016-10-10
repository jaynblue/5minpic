import React from 'react';
import ReactModal from 'react-modal';

import './styles.css';

export default class Modal extends React.Component {

	static propTypes = {
		activeModal: React.PropTypes.string,
		openModal: React.PropTypes.func,
		title: React.PropTypes.string,
		id: React.PropTypes.string
	}

	render() {
		const {
			activeModal,
			id,
			title,
			openModal
		} = this.props;

		return (
			<ReactModal className="modal" isOpen={activeModal === id}>
				<h1 className="modal__title">{ title }</h1>
				<div
					className="modal__close"
					onClick={openModal.bind(this, null)}
					>
					&#10006;
				</div>
				{ this.props.children }
			</ReactModal>
		);
	}
}

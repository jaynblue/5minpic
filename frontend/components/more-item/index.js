import React from 'react';
import '../more-item/styles.css';

export default class MoreItem extends React.Component {

    render() {
        return (
            <div className="more-item">
                <div className="more-item__header">
                    {this.props.image.word}
                </div>
                <div className="more-item__image">
                    <img src={this.props.image.min_path} />
                </div>
            </div>
        );
    }

}

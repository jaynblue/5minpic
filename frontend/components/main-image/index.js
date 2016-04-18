import React from 'react';
import '~/components/main-image/styles.css';

export default class MainImage extends React.Component {

    render() {
        return (
            <div className="main-image">
                <div className="main-image__wrap">
                    <img
                        src={this.props.image}
                        alt />
                </div>
            </div>
        );
    }

}

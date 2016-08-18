import React from 'react';
import '../main-image/styles.css';

export default class MainImage extends React.Component {

    handleFBclick = (e) => {
        if(!window.FB) return;
        FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
              object: document.location.href,
              message: this.props.image.word,
              image: document.location.origin + this.props.image.path
            })
        }, function(response){});
    }

    render() {
        return (
            <div className="main-image">
                <div className="main-image__head">
                    {this.props.image.word}
                </div>
                <div className="main-image__picture">
                    <img src={this.props.image.path} />
                </div>
                <div className="main-image__footer">
                    <a href="https://twitter.com/intent/tweet">
                        <img
                            className="twitter-button"
                            src={require('../../assets/twitter.svg')}
                            />
                    </a>
                    <img
                        className="facebook-button"
                        src={require('../../assets/facebook.svg')}
                        onClick={this.handleFBclick}
                        />
                </div>
            </div>
        );
    }

}

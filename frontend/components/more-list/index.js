import React from 'react';
import MoreItem from '~/components/more-item';
import '~/components/more-list/styles.css';

const SHOW_NUM = 16;

export default class MoreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photosToShow: SHOW_NUM
        }
    }

    resetStartState = () => {
        this.setState({
            photosToShow: SHOW_NUM
        });
    }

    updateNumberToShow = () => {
        this.setState({
            photosToShow: this.state.photosToShow + SHOW_NUM
        });
    }

    render() {
        const showData = this.props.data.slice(0, this.state.photosToShow);
        return (
            <div>
                <div className="more-list">
                    {showData.map((image, index) => {
                        return <MoreItem image={image}  key={index} />;
                    })}
                </div>
                <div
                    style={{display:(this.props.data.length > this.state.photosToShow) ? "block" : "none"}}
                    className="more-list__show"
                    onClick={this.updateNumberToShow}>
                    Show more..
                </div>
            </div>
        );
    }

}

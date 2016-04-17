import React from 'react';

import './styles.css';

const progressTime = 60000 * 5;
const step = 100;

export default class ProgressBar extends React.Component {

    state = {
        percent: this.props.startTime ? this.props.startTime*100/progressTime : 0
    }

    increment = () => {
        let percent = this.state.percent + (step*100/progressTime);
        percent = percent <= 100 ? percent : 0;
        this.setState({
          percent
      });
    }

    componentDidMount = () => {
        let time = this.props.startTime ? this.props.startTime : 0;
        (function updateWidth() {
            if (time <= progressTime) {
                this.increment();
                    time += step;
            } else {
                time = 0;
                this.props.onEnd && this.props.onEnd();
            }
            setTimeout(updateWidth.bind(this), step);
        }).call(this);
     };

    render() {
        return (
            <div className="progress-bar">
                <div
                    className="progress-bar__fill"
                    style={{width: this.state.percent+'%'}}>
                </div>
            </div>
        );
    }
}

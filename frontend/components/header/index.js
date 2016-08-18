import React from 'react';

import Calendar from '../calendar';
import ProgressBar from '../progressbar';

import './styles.css';

export default class Header extends React.Component {

    render() {

        return (
            <div className="header">
                <div className="header__inner">
                    <div className="header__logo">
                        <span className="header__vam-helper" />
                        <img src={require('../../assets/logo.svg') } />
                    </div>
                    <div className="header__word">
                        <div className="main-word">
                            <span className="main-word__word">
                                {this.props.word}
                            </span>
                        </div>
                    </div>
                    <div className="header__search">
                        <span className="header__vam-helper" />
                        <img src={require('../../assets/search.svg') } />
                    </div>
                    <div className="header__list">
                        <span className="header__vam-helper" />
                        <img src={require('../../assets/list.svg') } />
                    </div>
                    <div className="header__calendar">
                        <span className="header__vam-helper" />
                            <Calendar
                                selectedDay = {this.props.selectedDay}
                                handleDayClick = {this.props.handleDayClick}
                                availableDates = {this.props.availableDates}
                                />
                    </div>
                </div>
                {this.props.onTimer ?
                    <ProgressBar
                        onEnd = {this.props.onTimer}
                        startTime = {this.props.startTime}
                        />
                : ''}
            </div>

        );
    }
}

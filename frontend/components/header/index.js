import React from 'react';

import Calendar from '~/components/calendar';

import './styles.css';

export default class Header extends React.Component {

    render() {

        return (
            <div className="header">
                <div className="header__inner">
                    <div className="header__logo">
                        <span className="header__vam-helper" />
                        <img src={require('~/assets/logo.png') } />
                    </div>
                    <div className="header__word">
                        <div className="main-word">
                            <span className="main-word__caption">
                                5 minutes picture name:
                            </span>
                            <span className="main-word__word">
                                {this.props.word}
                            </span>
                        </div>
                    </div>
                    <div className="header__search">
                        <span className="header__vam-helper" />
                        <img src={require('~/assets/search.svg') } />
                    </div>
                    <div className="header__calendar">
                        <span className="header__vam-helper" />
                            <Calendar
                                selectedDay = {this.props.selectedDay}
                                handleDayClick={this.props.handleDayClick}
                                availableDates= {this.props.availableDates}
                                />
                    </div>
                </div>
            </div>

        );
    }
}

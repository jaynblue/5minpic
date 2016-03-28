import React from 'react';

import Calendar from '~/components/calendar';

import $ from 'jquery';
import MainImage from '~/components/main-image';
import MoreList from '~/components/more-list';

import './styles.css';

export default class App extends React.Component {
    state = {
        // initial data is null
        data: null,
        mainImage: null,
        selectedDay: new Date()
    }

    componentDidMount() {
        this.serverRequest = $.get(this.props.source, data => {
            var imagesByDate = data.sort((a,b) => b.ctime - a.ctime)
            this.setState({
                mainImage: imagesByDate.shift(),
                data: imagesByDate,
            });
        });
    }

    handleDayClick = (e, day, modifiers) => {
        this.setState({
          selectedDay: modifiers.indexOf("selected") > -1 ? null : day
        });
    }

    render() {

        if (this.state.data === null) {
            return (
                <div className="app app_loading">
                    Loading... Please wait
                </div>
            );
        }

        return (
            <div className="app">
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
                                    {this.state.mainImage.word}
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
                                    selectedDay = {this.state.selectedDay}
                                    handleDayClick={ this.handleDayClick }
                                    />
                        </div>
                    </div>
                </div>
                <div className="main">
                    <MainImage image={this.state.mainImage.path} />
                    <div className="more">
                        <div className="more__header">
                            More today pictures:
                        </div>
                        <MoreList data={this.state.data} />
                    </div>
                </div>
                <div className="footer">
                    © {new Date().getFullYear()}, Mak0FFD
                </div>
            </div>

        );
    }
}

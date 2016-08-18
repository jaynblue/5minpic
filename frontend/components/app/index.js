import React from 'react';
import $ from 'jquery';
import Header from '../header';
import Footer from '../footer';
import MainImage from '../main-image';
import ImageList from '../image-list';

import './styles.css';

export default class App extends React.Component {

    state = {
        // initial data is null
        data: null,
        availableDates: [],
        selectedDay: new Date().toDateString(),
        startTime: 0
    }

    cachedData = {}

    updateData = (options = {cache: true}) => {
        if (!this.state.selectedDay) return;
        this.setState({
            data: null
        });
        if (!options.cache ||  !this.cachedData[this.state.selectedDay]) {
            $.get(this.props.source, {
                date: this.state.selectedDay
            })
            .done(data => {
                var newDates = {};
                Object.assign(
                    newDates,
                    this.state.availableDates,
                    data.availableDates
                );
                this.cachedData[this.state.selectedDay]= {
                    data: data.todayImages.sort((a,b) => b.ctime - a.ctime),
                    availableDates: newDates,
                    startTime: data.startTime
                }
                this.setState({
                    ...this.cachedData[this.state.selectedDay]
                });
            });
        } else {
            this.setState({
                ...this.cachedData[this.state.selectedDay]
            });
        }
    }

    componentDidMount() {
        this.updateData({cache: false});
    }

    handleDayClick = (e, day, modifiers) => {
        if (day == this.state.selectedDay
                || ~modifiers.indexOf("selected")
                || ~modifiers.indexOf("isDisabled")) return;
        this.setState(
            { selectedDay: day.toDateString() },
            () => {
                this.refs['imageList'] && this.refs['imageList'].resetStartState();
                this.updateData();
            }
        );
    }

    render() {

        if (this.state.data === null) {
            return (
                <div className="app app_loading">
                    Loading... Please wait
                </div>
            );
        }

        if (this.state.data.length == 0) {
            return (
                <div className="app">
                    <Header
                        word="Sorry.."
                        selectedDay = {this.state.selectedDay}
                        handleDayClick = {this.handleDayClick}
                        availableDates = {this.state.availableDates}
                        />
                    <div className="app_message">
                        There is no images for today<br/>
                        Please try another date
                    </div>
                    <Footer />
                </div>
            );
        }

        return (
            <div className="app">
                <Header
                    word = {this.state.data[0].word}
                    selectedDay = {this.state.selectedDay}
                    handleDayClick = {this.handleDayClick}
                    availableDates = {this.state.availableDates}
                    onTimer = {this.updateData.bind(this, {cache: false})}
                    startTime = {this.state.startTime}
                    />
                <div className="main">
                    <ImageList ref="imageList" data = {this.state.data} />
                </div>
                <Footer />
            </div>

        );
    }
}

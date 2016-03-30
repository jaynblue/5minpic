import React from 'react';
import $ from 'jquery';
import Header from '~/components/header';
import MainImage from '~/components/main-image';
import MoreList from '~/components/more-list';

import './styles.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial data is null
            data: null,
            availableDates: [],
            selectedDay: new Date()
        }
    }

    updateData = () => {
        if (!this.state.selectedDay) return;
        $.get(this.props.source, {
                date: this.state.selectedDay
            })
            .done(data => {
                var imagesByDate = data.todayImages.sort((a,b) => b.ctime - a.ctime)
                this.setState({
                    data: imagesByDate,
                    availableDates: data.availableDates
                });
            });
    }

    componentDidMount() {
        this.updateData();
    }

    handleDayClick = (e, day, modifiers) => {
        if (day == this.state.selectedDay
                || ~modifiers.indexOf("selected")
                || ~modifiers.indexOf("isDisabled")) return;
        this.setState({
          selectedDay: day
        }, this.updateData);
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
                        selectedDay={this.state.selectedDay}
                        handleDayClick={this.handleDayClick}
                        availableDates= {this.state.availableDates}
                        />
                    <div className="app_message">
                        There is no images for today<br/>
                        Please try another date
                    </div>
                    <div className="footer">
                        © {new Date().getFullYear()}, Mak0FFD
                    </div>
                </div>
            );
        }

        return (
            <div className="app">
                <Header
                    word={this.state.data[0].word}
                    selectedDay={this.state.selectedDay}
                    handleDayClick={this.handleDayClick}
                    availableDates= {this.state.availableDates}
                    />
                <div className="main">
                    <MainImage image={this.state.data[0].path} />
                    <div className="more">
                        <div className="more__header">
                            More today pictures:
                        </div>
                        <MoreList data={this.state.data.slice(1)} />
                    </div>
                </div>
                <div className="footer">
                    © {new Date().getFullYear()}, Mak0FFD
                </div>
            </div>

        );
    }
}

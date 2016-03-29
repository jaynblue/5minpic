import React from 'react';
import $ from 'jquery';
import Header from '~/components/header';
import MainImage from '~/components/main-image';
import MoreList from '~/components/more-list';

import './styles.css';

export default class App extends React.Component {
    state = {
        // initial data is null
        data: null,
        mainImage: null,
        availibleDates: [],
        selectedDay: new Date()
    }

    updateData = () => {
        $.get(this.props.source, {
                date: this.state.selectedDay
            })
            .done(data => {
                var imagesByDate = data.todayImages.sort((a,b) => b.ctime - a.ctime)
                this.setState({
                    mainImage: imagesByDate.shift(),
                    data: imagesByDate,
                    availibleDates: data.availibleDates
                });
            });
    }

    componentDidMount() {
        this.updateData();
    }

    handleDayClick = (e, day, modifiers) => {
        this.setState({
          selectedDay: modifiers.indexOf("selected") > -1 ? null : day
        });
        this.updateData();
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
                <Header
                    word="Sorry.. there's no images"
                    selectedDay={this.state.selectedDay}
                    handleDayClick={ this.handleDayClick }
                    />
            );
        }

        return (
            <div className="app">
                <Header
                    word={this.state.mainImage.word}
                    selectedDay={this.state.selectedDay}
                    handleDayClick={ this.handleDayClick }
                    />
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

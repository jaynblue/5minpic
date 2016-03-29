import React from 'react';
import ReactDOM from 'react-dom';
import {DayPicker, DateUtils} from './day-picker';
import './styles.css';

export default class Calendar extends React.Component {
    state = {
        show: false
    };

    toggleCalendar = (e) => {
        if (ReactDOM.findDOMNode(this).contains(e.target)) {
            if (this.state.show) return;
            this.setState({
                show: !this.state.show
            });
        } else {
            this.setState({
                show: false
            });
        }
    };

    componentWillMount = () => {
        document.addEventListener('click', this.toggleCalendar, false);
    };

    componentWillUnmount = () => {
        document.removeEventListener('click', this.toggleCalendar, false);
    };

    render() {
        return (
            <div className={this.state.show ? 'calendar calendar_expanded' : 'calendar'}>
                <img src={require('~/assets/calendar.svg')} />
                <div className="calendar__daypicker">
                    <DayPicker
                        onDayClick={this.props.handleDayClick}
                        enableOutsideDays={false}
                        modifiers={{
                            isDisabled: day => !(day in this.props.availableDates),
                            sunday: day => day.getDay() === 0,
                            saturday: day => day.getDay() === 6,
                            selected: day => DateUtils.isSameDay(this.props.selectedDay, day)
                        }}
                        />
                </div>
            </div>
        );
    };
}

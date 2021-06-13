import React from 'react';
import './nextFewHoursStyles.css';

export class NextFewHours extends React.Component {
    render(){
        return(
        <div className='nextFewHours'>
            <i className='specDayIcon'>{this.props.icon}</i>
            <p className='label'>{this.props.time}</p>
            <p className='perc'>{this.props.perc}</p>
            <p className='temp'>{this.props.temp}<small>°F</small></p>
            <p className='wind'>{this.props.wind}<small>mph</small></p>
        </div>
        )
    }
}
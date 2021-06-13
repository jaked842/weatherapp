import React from 'react';
import './nextFewStyles.css';

export class NextFew extends React.Component {
    render(){
        return(
        <div className='nextFew'>
            <i className='specDayIcon'>{this.props.icon}</i>
            <p className='lab'>{this.props.weekDay}</p>
            <p className='perc'>{this.props.perc}</p>
            <p className='tempHigh'>H: {this.props.tempHigh}<small>°F</small></p>
            <p className='tempLow'>L: {this.props.tempLow}<small>°F</small></p>
            <p className='wind'>{this.props.wind}<small>mph</small></p>
        </div>
        )
    }
}
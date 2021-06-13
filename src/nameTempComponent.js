import React from 'react';
import './styles.css';


export class NameTemp extends React.Component {
  
    render(){
        return(
        <>
            <div className='topSection'>
                <p className='day'>{this.props.day}</p>
                <div className='mainInfo'>
                    <p className='currentTime'>{this.props.currentTime}</p>
                    <p className='currentTemp'>{this.props.currentTemp}<small>°F</small></p>
                    <p className='skyCover'>{this.props.skyCover}</p>
                </div>
                <div className='bottomSection'>
                    <div className='bottomLeft'>
                        <p className='feelTemp'>Feels Like: {this.props.feelTemp}<small>°F</small></p>
                        <p className='humidity'>Humidity: {this.props.humidity}% </p>
                        <p className='pressure'>Pressure: {this.props.pressure}</p>
                        <p className='visibility'>Visibility: {this.props.visibility}</p>
                        <p className='cloudiness'>Coudiness: {this.props.cloudiness}%</p>
                        <p className='windspeed'>Wind: {this.props.windspeed}</p>
                    </div>
                    <div className='bottomRight'>
                        <p className='uvindex'>{this.props.uvindex}</p>
                        <p className='sunrise'>{this.props.sunrise}</p>
                        <p className='sunset'>{this.props.sunset}</p>
                    </div>
                </div>
            </div>
         </>   
        )
    }
}
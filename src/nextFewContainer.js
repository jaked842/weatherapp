import React from 'react';
import './nextFewStyles.css';
import { NextFew } from './nextFew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSunRain, faCloud, faCloudShowersHeavy, 
    faBolt, faSnowflake, faWater,faTint,faWind } 
from '@fortawesome/free-solid-svg-icons';
import store from './index';

const API_key=process.env.REACT_APP_WEATHER_API_KEY;
const unit = 'imperial';

const clearsky = <FontAwesomeIcon icon={faSun} className='iconSun'/>;
const rain = <FontAwesomeIcon icon={faCloudSunRain} className='iconRain'/>;
const fewclouds = <FontAwesomeIcon icon={faCloud} className='iconFewCloud'/>;
const showerrain = <FontAwesomeIcon icon={faCloudShowersHeavy} className='iconShowerrain'/>;
const thunderstorm = <FontAwesomeIcon icon={faBolt} className='iconThunderstorm'/>;
const snow = <FontAwesomeIcon icon={faSnowflake} className='iconSnow'/>;
const mist = <FontAwesomeIcon icon={faWater} className='icon'/>;
const waterdrop = <FontAwesomeIcon icon={faTint} className='iconwaterdrop'/>;
const wind = <FontAwesomeIcon icon={faWind} className = 'icon-wind'/>;
const day = new Date().getDay();

export class NextFewContainer extends React.Component {
    constructor (props){
        super (props)

        this.state = {
            iconD1: undefined,
            perc1: undefined,
            D1: undefined,
            tempHD1: undefined,
            tempLD1: undefined,
            wind1: undefined,
                iconD2: undefined,
                perc2: undefined,
                D2: undefined,
                tempHD2: undefined,
                tempLD2: undefined,
                wind2: undefined,
                    iconD3: undefined,
                    perc3: undefined,
                    D3: undefined,
                    tempHD3: undefined,
                    tempLD3: undefined,
                    wind3: undefined,
                        iconD4: undefined,
                        perc4: undefined,
                        D4: undefined,
                        tempHD4: undefined,
                        tempLD4: undefined,
                        wind4: undefined,
                            iconD5: undefined,
                            perc5: undefined,
                            D5: undefined,
                            tempHD5: undefined,
                            tempLD5: undefined,
                            wind5: undefined,
                                iconD6: undefined,
                                perc6: undefined,
                                D6: undefined,
                                tempHD6: undefined,
                                tempLD6: undefined,
                                wind6: undefined,
                                    iconD7: undefined,
                                    perc7: undefined,
                                    D7: undefined,
                                    tempHD7: undefined,
                                    tempLD7: undefined,
                                    wind7: undefined
        }; 
    }
    weatherIcon = (w) =>{
        switch (w){
            case '11d':
                return thunderstorm;
            case '11n': 
                return thunderstorm
            case '09d':
                return rain;
            case '09n':
                return rain;
            case '10d':
                return showerrain;
            case '10n': 
                return showerrain;
            case '13d':
                return snow;
            case '13n':
                return snow;
            case '50d':
                return mist;
            case '50n':
                return mist;
            case '01d':
                return clearsky;
            case '01n':
                return clearsky;
            case '02d':
                return fewclouds;
            case '02n':
                return fewclouds;
            case '03d':
                return fewclouds;
            case '03n':
                return fewclouds;
            case '04d':
                return fewclouds;
            case '04n':
                return fewclouds;    
            default:
                return fewclouds
        }
    }
        weekday(increment){
            let days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
            'Saturday']
            let totalD = day + increment;
            if(totalD > 6){
                return days[totalD - 7]
            }else{return days[day + increment]}
        }
        percentage(d){
            let e = d * 100;
            e = Math.round(e);
            console.log(e);
            let fst = e.toString().replace('.', '');
            let snd = [waterdrop, fst + '%']
            return snd;
        }
        time = (t) =>{
            var dt = new Date(t*1000);
            var hr = dt.getHours();
            var m = "0" + dt.getMinutes();
            if (hr > 12){
                return (hr - 12)+ ':' + m.substr(-2) + ' PM'; 
            }else
                {return hr+ ':' + m.substr(-2) + ' AM'};  
        }
    
        
        
    componentDidMount(){
        store.subscribe(() => { 
            let lat = store.getState()[0].latitude
            let lon = store.getState()[0].longitude
         fetch(
            'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=' + unit + '&appid=' + API_key
        )
        .then(response => response.json())
        .then(data => { 
            console.log(data);
            this.setState({
                iconD1: this.weatherIcon(data.daily[1].weather[0].icon),
                perc1: this.percentage(data.daily[1].pop),
                D1: this.weekday(1),
                tempHD1: Math.round(data.daily[1].temp.max),
                tempLD1: Math.round(data.daily[1].temp.min),
                wind1: [wind,Math.round(data.daily[1].wind_speed)],
                    iconD2: this.weatherIcon(data.daily[2].weather[0].icon),
                    perc2: this.percentage(data.daily[2].pop),
                    D2: this.weekday(2),
                    tempHD2: Math.round(data.daily[2].temp.max),
                    tempLD2: Math.round(data.daily[2].temp.min),
                    wind2: [wind,Math.round(data.daily[2].wind_speed)],
                        iconD3: this.weatherIcon(data.daily[3].weather[0].icon),
                        perc3: this.percentage(data.daily[3].pop),
                        D3: this.weekday(3),
                        tempHD3: Math.round(data.daily[3].temp.max),
                        tempLD3: Math.round(data.daily[3].temp.min),
                        wind3: [wind,Math.round(data.daily[3].wind_speed)],
                            iconD4: this.weatherIcon(data.daily[4].weather[0].icon),
                            perc4: this.percentage(data.daily[4].pop),
                            D4: this.weekday(4),
                            tempHD4: Math.round(data.daily[4].temp.max),
                            tempLD4: Math.round(data.daily[4].temp.min),
                            wind4: [wind,Math.round(data.daily[4].wind_speed)],
                                iconD5: this.weatherIcon(data.daily[5].weather[0].icon),
                                perc5: this.percentage(data.daily[5].pop),
                                D5: this.weekday(5),
                                tempHD5: Math.round(data.daily[5].temp.max),
                                tempLD5: Math.round(data.daily[5].temp.min),
                                wind5: [wind,Math.round(data.daily[5].wind_speed)],
                                    iconD6: this.weatherIcon(data.daily[6].weather[0].icon),
                                    perc6: this.percentage(data.daily[6].pop),
                                    D6: this.weekday(6),
                                    tempHD6: Math.round(data.daily[6].temp.max),
                                    tempLD6: Math.round(data.daily[6].temp.min),
                                    wind6: [wind,Math.round(data.daily[6].wind_speed)],
                                        iconD7: this.weatherIcon(data.daily[7].weather[0].icon),
                                        perc7: this.percentage(data.daily[7].pop),
                                        D7: this.weekday(7),
                                        tempHD7: Math.round(data.daily[7].temp.max),
                                        tempLD7: Math.round(data.daily[7].temp.min),
                                        wind7: [wind,Math.round(data.daily[7].wind_speed)],
            })
        })
    })
    }


    render(){
        return(
        <div className='nextFewContainer'>
            <div className='nextFewTop'>
                <NextFew 
                    icon={this.state.iconD1}
                    perc={this.state.perc1}
                    weekDay={this.state.D1}
                    tempHigh={this.state.tempHD1}
                    tempLow={this.state.tempLD1}
                    wind={this.state.wind1}
                />
                <NextFew 
                    icon={this.state.iconD2}
                    perc={this.state.perc2}
                    weekDay={this.state.D2}
                    tempHigh={this.state.tempHD2}
                    tempLow={this.state.tempLD2}
                    wind={this.state.wind2}
                />
                <NextFew 
                    icon={this.state.iconD3}
                    perc={this.state.perc3}
                    weekDay={this.state.D3}
                    tempHigh={this.state.tempHD3}
                    tempLow={this.state.tempLD3}
                    wind={this.state.wind3}
                />
            </div>
            <div className='nextFewBottom'>
                <NextFew 
                    icon={this.state.iconD4}
                    perc={this.state.perc4}
                    weekDay={this.state.D4}
                    tempHigh={this.state.tempHD4}
                    tempLow={this.state.tempLD4}
                    wind={this.state.wind4}
                />
                <NextFew 
                    icon={this.state.iconD5}
                    perc={this.state.perc5}
                    weekDay={this.state.D5}
                    tempHigh={this.state.tempHD5}
                    tempLow={this.state.tempLD5}
                    wind={this.state.wind5}
                />
                <NextFew 
                    icon={this.state.iconD6}
                    perc={this.state.perc6}
                    weekDay={this.state.D6}
                    tempHigh={this.state.tempHD6}
                    tempLow={this.state.tempLD6}
                    wind={this.state.wind6}
                />
                <NextFew 
                    icon={this.state.iconD7}
                    perc={this.state.perc7}
                    weekDay={this.state.D7}
                    tempHigh={this.state.tempHD7}
                    tempLow={this.state.tempLD7}
                    wind={this.state.wind7}
                />
            </div>
        </div>
        )
    }
}
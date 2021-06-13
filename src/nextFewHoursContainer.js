import React from 'react';
import { NextFewHours } from './nextFewHours';
import './nextFewHoursStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSunRain, faCloud, faCloudShowersHeavy, 
    faBolt, faSnowflake, faWater,faTint, faWind } 
from '@fortawesome/free-solid-svg-icons';
import store from '.';

const API_key=process.env.REACT_APP_WEATHER_API_KEY;
const unit = 'imperial';

const clearsky = <FontAwesomeIcon icon={faSun} className='iconSun'/>;
const rain = <FontAwesomeIcon icon={faCloudSunRain} className='iconRain'/>;
const fewclouds = <FontAwesomeIcon icon={faCloud} className='iconFewCloud'/>;
const showerrain = <FontAwesomeIcon icon={faCloudShowersHeavy} className='iconShowerrain'/>;
const thunderstorm = <FontAwesomeIcon icon={faBolt} className='iconThunderstorm'/>;
const snow = <FontAwesomeIcon icon={faSnowflake} className='icon-snow'/>;
const mist = <FontAwesomeIcon icon={faWater} className='icon'/>;
const waterdrop = <FontAwesomeIcon icon={faTint} className='iconwaterdrop'/>;
const wind = <FontAwesomeIcon icon={faWind} className='icon-wind'/>;


export class NextFewHoursContainer extends React.Component {
    constructor (props){
        super (props)

        this.state = {
            icon1: undefined, 
            perch1: undefined,
            t1: undefined,
            temp1: undefined,
            wind1: undefined,
                icon2: undefined, 
                perch2: undefined,
                t2: undefined,
                temp2: undefined,
                wind2: undefined,
                    icon3: undefined, 
                    perch3: undefined,
                    t3: undefined,
                    temp3: undefined,
                    wind3: undefined,
                        icon4: undefined, 
                        perch4: undefined,
                        t4: undefined,
                        temp4: undefined,
                        wind4: undefined
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
                return fewclouds;
        }
    }
    percentage(d){
        let e = d * 100;
        e = Math.round(e);
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
            }
            if(hr === 0){
                return 12 + ":" + m.substr(-2) + ' AM';
            }
            else
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
                this.setState({
                    icon1: this.weatherIcon(data.hourly[2].weather[0].icon),
                    perch1: this.percentage(data.hourly[2].pop),
                    t1: this.time(data.hourly[2].dt),
                    temp1: Math.round(data.hourly[2].temp),
                    wind1: [wind,Math.round(data.hourly[2].wind_speed)],
                        icon2: this.weatherIcon(data.hourly[4].weather[0].icon),
                        perch2: this.percentage(data.hourly[4].pop),
                        t2: this.time(data.hourly[4].dt),
                        temp2: Math.round(data.hourly[4].temp),
                        wind2: [wind,Math.round(data.hourly[4].wind_speed)],
                            icon3: this.weatherIcon(data.hourly[6].weather[0].icon),
                            perch3: this.percentage(data.hourly[6].pop),
                            t3: this.time(data.hourly[6].dt),
                            temp3: Math.round(data.hourly[6].temp),
                            wind3: [wind,Math.round(data.hourly[6].wind_speed)],
                                icon4: this.weatherIcon(data.hourly[8].weather[0].icon),
                                perch4: this.percentage(data.hourly[8].pop),
                                t4: this.time(data.hourly[8].dt),
                                temp4: Math.round(data.hourly[8].temp),
                                wind4: [wind,Math.round(data.hourly[8].wind_speed)],
    
                })
            })
        })
    }

    render(){
        return(
                <div className = 'nextFewHoursContainer'>
                    <NextFewHours 
                        icon={this.state.icon1}
                        perc={this.state.perch1}
                        time={this.state.t1}
                        temp={this.state.temp1}
                        wind={this.state.wind1}
                    />
                    <NextFewHours 
                        icon={this.state.icon2}
                        perc={this.state.perch2}
                        time={this.state.t2}
                        temp={this.state.temp2}
                        wind={this.state.wind2}
                    />
                    <NextFewHours 
                        icon={this.state.icon3}
                        perc={this.state.perch3}
                        time={this.state.t3}
                        temp={this.state.temp3}
                        wind={this.state.wind3}
                    />
                    <NextFewHours 
                        icon={this.state.icon4}
                        perc={this.state.perch4}
                        time={this.state.t4}
                        temp={this.state.temp4}
                        wind={this.state.wind4}
                    />
                </div>
        )
    }
}
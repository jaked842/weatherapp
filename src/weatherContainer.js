import React from 'react';
import './styles.css';
import { NameTemp } from './nameTempComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSunRain, faCloud, faCloudShowersHeavy, 
    faBolt, faSnowflake, faWater, faClock, faThermometerHalf, faCaretUp, faCaretDown, faLightbulb } 
from '@fortawesome/free-solid-svg-icons';
import store from './index';

const API_key=process.env.REACT_APP_WEATHER_API_KEY;

const unit = 'imperial';


const clearsky = <FontAwesomeIcon icon={faSun} className='iconSun'/>;
        const rain = <FontAwesomeIcon icon={faCloudSunRain} className='iconRain'/>;
        const fewclouds = <FontAwesomeIcon icon={faCloud} className='icon'/>;
        const showerrain = <FontAwesomeIcon icon={faCloudShowersHeavy} className='iconShowerrain'/>;
        const thunderstorm = <FontAwesomeIcon icon={faBolt} className='iconThunderstorm'/>;
        const snow = <FontAwesomeIcon icon={faSnowflake} className='icon'/>;
        const mist = <FontAwesomeIcon icon={faWater} className='icon'/>;
        const clock = <FontAwesomeIcon icon={faClock} className='iconClock'/>;
        const thermometer = <FontAwesomeIcon icon={faThermometerHalf} className='iconThermometer'/>;
        const arrowup = <FontAwesomeIcon icon={faCaretUp} className='icon'/>;
        const arrowdown = <FontAwesomeIcon icon={faCaretDown} className='icon'/>;
        const lightbulb = <FontAwesomeIcon icon={faLightbulb} className='icon'/>;

        let calcDay = new Date().getDay();
        let calcMonth = new Date().getMonth();

        let date = new Date().getDate();


        const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const months = ["January ", "February ", "March ", "April ", "May ", "June ", "July ", 
                       "August ", "September ", "October ", "November ", "December "];

                       let toTempF = (temp) =>{
                        return Math.round(temp); 
                    }


export class CurrentWeather extends React.Component {
    constructor (props){
        super(props)
    
        this.state = {
            lat: undefined,
            lon: undefined,
            day: undefined,
            currentTime: undefined,
            skyCover: undefined,
            currentTemp: undefined,
            feelTemp: undefined,
            humidity: undefined,
            pressure: undefined, 
            visibility: undefined,
            cloudiness: undefined,
            windspeed: undefined,
            uvindex: undefined,
            sunrise: undefined,
            sunset: undefined, 
            icon: undefined,
            res: undefined
        }
  
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
    time = (t) =>{
        var dt = new Date(t*1000);
        var hr = dt.getHours();
        var m = "0" + dt.getMinutes();
        if (hr > 12){
            return (hr - 12)+ ':' + m.substr(-2) + ' PM'; 
        }else
            {return hr+ ':' + m.substr(-2) + ' AM'};  
    }

    realDate = (a) =>{
            let d = a.toString();

            if (d.length < 2){
                if(d.charAt(0) === "1"){
                    return d + "st";
                }
                if(d.charAt(0) === "2"){
                    return d + "nd";
                }
                if(d.charAt(0) === "3"){
                    return d = "rd";
                }
                if(a >= 4){
                    return d + "th";
                }
            }else{
                if(d.charAt(1) === "1"){
                    return d + "st";
                }
                if(d.charAt(1) === "2"){
                    return d + "nd";
                }
                if(d.charAt(1) === "3"){
                    return d + "rd";
                }
                else{
                    return d + "th";
                }
            }  
        }
 

    vis = (v) =>{ 
        let result = Math.round(v * 3.28084);
        let resultS = result.toString();

        if (resultS.length > 3){
            let fst = resultS.substring(0,2)
            let snd = resultS.substring(2,5)
            let fnl = fst + ',' + snd;
            return fnl;
        }else{
        return result 
        }
    }


     componentDidMount(){
         store.subscribe(() => {
             let lat = store.getState()[0].latitude
             let lon = store.getState()[0].longitude
            fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=' + unit + '&appid=' + API_key
            )
            .then (data => data.json())
            .then(response => {
                this.setState({
                    icon: this.weatherIcon(response.current.weather[0].icon),
                    day: [weekDay[calcDay] + ", ", months[calcMonth], this.realDate(date)],
                    currentTime: [clock, this.time(response.current.dt)],
                    skyCover: (response.current.weather[0].description).toUpperCase(),
                    currentTemp: [thermometer, toTempF(response.current.temp)],
                    feelTemp: toTempF(response.current.feels_like),
                    humidity: response.current.humidity,
                    pressure: response.current.pressure,
                    visibility: this.vis(response.current.visibility),
                    cloudiness: response.current.clouds,
                    windspeed: Math.round(response.current.wind_speed) + "mph",
                    uvindex: [lightbulb, response.current.uvi],
                    sunrise: [arrowup, this.time(response.current.sunrise)],
                    sunset: [arrowdown, this.time(response.current.sunset)]
                })
            })
         })
    }

    render(){
        return(
        <>
            <NameTemp 
            icon={this.state.icon}
            day={this.state.day}
            currentTime={this.state.currentTime}
            skyCover={this.state.skyCover} 
            currentTemp={this.state.currentTemp}
            feelTemp={this.state.feelTemp}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            visibility={this.state.visibility}
            cloudiness={this.state.cloudiness}
            windspeed={this.state.windspeed}
            uvindex={this.state.uvindex}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            />
        </>
        )
    }
}
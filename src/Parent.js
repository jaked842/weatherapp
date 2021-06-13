import React from 'react';
import store from './index';
import { CurrentWeather } from './weatherContainer';
import { NextFewContainer } from './nextFewContainer';
import { NextFewHoursContainer } from './nextFewHoursContainer';

export default class Parent extends React.Component{
  
  componentDidMount(){
    let getLocation= ()=>{
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    if (navigator.geolocation){
        getLocation();
    }else{
        alert('GeoLocation is not available on your browser')
    }


    function showPosition (position){
            var lat = position.coords.latitude.toString();
            var lon = position.coords.longitude.toString();
            store.dispatch({
                type: 'setlocation',
                payload: {
                    latitude: lat,
                    longitude: lon
                }
            })
        };

        function showError(error) {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                alert('You must allow Geolocation for an accurate forecast. Please see browser settings to share your location');
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
              case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
                default:
                  alert('An Unknown error occurred')

            }
          } 
    
}


    render(){
        return(
        <>
            <div>
            <CurrentWeather />
          </div>
          <div>
            <NextFewHoursContainer />
          </div>
          <div className='futuredays'>
            <NextFewContainer />
          </div>
        </>
        )
    }
    
}
import React, { useState, useEffect } from "react";
import {ReactComponent as WindIcon} from './wind_icon.svg';
import {ReactComponent as TempIcon} from './temperature_icon.svg';
import {ReactComponent as SunsetIcon} from './sunset.svg';

const apiKey = "495e30fc25a93199c888e39a9fe1ef1e";
const url = (latitude, longitude) => `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

export default function WeatherGeo () {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = () => {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const { coords } = position;

                setLat(coords.latitude);
                setLong(coords.longitude);

                const apiUrlToEndpoint = url(coords.latitude, coords.longitude);
                const response = await fetch(apiUrlToEndpoint)
                const data = await response.json();

                setData(data);
                console.log(data);
            });
        };

        fetchData() 
        
    }, []);

    if (!data) {
        return <div>Loading...</div>
    }

    function convertToWeekDays (time) {
        const date = new Date(time*1000).getDay();
        if(date === 0){
            return "Sunday"
        } else if(date === 1){
            return "Monday"
        } else if(date === 2){
            return "Tuesday"
        } else if(date === 3){
            return "Wednesday"
        } else if(date === 4){
            return "Thursday"
        } else if(date === 5){
            return "Friday"
        } else if(date === 6){
            return "Saturday"
        }
    }

    function convertToHours (time) {
       const date = new Date(time*1000)
       const hours = date.getHours();
       const minutes = date.getMinutes(); 
       let formatedDate = '';
       formatedDate += hours > 9 ? hours : "0" + hours
       formatedDate += minutes > 9 ? ':' + minutes : ':' + '0' + minutes
       return formatedDate
    }

    const main = data.main;
    const sys = data.sys;
    const weather = data.weather
    const wind = data.wind
    const unixTime = data.dt
    const iconURL = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    return (
        <div className="weather-geolocation-container">
            <div className='main_container'>
                <div className="main_info">
                <div className="day">{convertToWeekDays(unixTime)}</div>
                <div className="min_max_temp">
                    <div className="min_temp">▼{(main.temp_min).toFixed(1)}°C</div>
                    <div className="max_temp">▲{(main.temp_max).toFixed(1)}°C</div>
                </div>
                <div className="main_temp_container">
                    < TempIcon className="temp_icon"/>
                    <div className="temp">{(main.temp).toFixed(1)}°C</div>
                </div>
                <div className="humidity_fells_like">
                <div className="humidity">Humidity: {main.humidity}%</div>
                <div className="feels_like_temp">Feels like: {(main.feels_like).toFixed(1)}°C</div>
                <div className="pressure">Pressure: {main.pressure} hPa</div>
                </div>
            </div>
            <div className="icon_description">
                <img className="weather_icon" src={iconURL}/>
                <div className="description">{weather[0].description}</div>
            </div>
            <div className="wind_info">
                <div className="wind">Wind</div>
                <div className="icon_container">
                    <WindIcon className="additional_icon"/>
                </div>
                <div className="direction">Direction: {wind.deg}</div>
                <div className="speed">Speed: {((wind.speed)* 3.6).toFixed(1)}km/h</div>
            </div>
            <div className="detail_info">
                <SunsetIcon />
                <div className="sunrise">Sunrise: {convertToHours(sys.sunrise)}</div>
                <div className="sunset">Sunset: {convertToHours(sys.sunset)}</div>
            </div>
        </div>
    </div>
    )
}
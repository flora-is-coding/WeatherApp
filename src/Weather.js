import { useParams } from 'react-router-dom';
import {ReactComponent as WindIcon} from './wind_icon.svg';
import {ReactComponent as TempIcon} from './temperature_icon.svg';
import {ReactComponent as SunsetIcon} from './sunset.svg';
import { useState, useEffect } from 'react';

const apiKey = "495e30fc25a93199c888e39a9fe1ef1e";
const urlCityName = (cityName) => `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

export default function Weather (props) {
    const [data, setData] = useState(null)
    const params = useParams();
    console.log(params.name)

    useEffect(() => {
        fetch(urlCityName(params.name))
        .then(resp => resp.json())
        .then(data => setData(data))
    }, []);

    if (!data) {
        return <li className="list-item">
            {params.name} - loading...
        </li>
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
        <div className="weather-container">
            <div className='city-name'>{data.name}</div>
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
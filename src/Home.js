import { useState } from 'react';
import {Link} from 'react-router-dom'

import { Autocomplete } from './components/Autocomplete/Autocomplete';
import { AutocompleteItem } from './components/Autocomplete/AutocompleteItem';
import { ResultList } from './components/ResultList/ResultList';

const apiKey = "495e30fc25a93199c888e39a9fe1ef1e";
const urlCityName = (cityName) => `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

class Exception extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
        this.message = message;
    }
}

function throwException(name, message) {
    throw new Exception(name, message);
}

function Home () {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [citiesWeather, setCitiesWeather] = useState([]);

    const handleChange = (value) => {
        console.log('autocomplete has changed', value)

        setError(null);
        fetch(urlCityName(value))
            .then(response => response.status === 200 
                ? response.json()
                : throwException('CityNotFound', response.statusText)
            )
            .then(data => setData(data))
            .catch((error) => handleError(error))
    }

    console.log(data);

    const handleError = (error) => {
        setError(error);
        setData(null);
    }

    const handleClick = () => {
        setCitiesWeather([...citiesWeather, data])
    }

    return (
        <div className='container'>
            <h1>Welcome to my-weather-app</h1>
            {/* <div className='link-container'>
                <div className='link link-geolocation'>
                    <Link className='link-home-element' to="WeatherByGeolocation">Weather by Geolocation</Link>
                </div>
                <div className='link link-city-name'>
                    <Link className='link-home-element' to="WeatherByCityName">Weather by City Name</Link>
                </div>
            </div> */}
            
            <Autocomplete onChange={handleChange}>
                {error && (
                    <AutocompleteItem>
                        {error.message}
                    </AutocompleteItem>
                )}
                {data && (
                <AutocompleteItem onClick={handleClick} path={`/Weather/${data.name}`}>
                    {data.name} {(data.main.temp).toFixed(1)}°C
                </AutocompleteItem>
                )}
            </Autocomplete>
            <div className='result'>
                <ul className='result__list'>
                    {data && 
                    <ResultList 
                    citiesList={citiesWeather}
                    />}
                </ul>
            </div>
        </div>
    )
}

export default Home;
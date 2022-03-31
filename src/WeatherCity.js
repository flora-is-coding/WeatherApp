import { useState, useRef, useEffect} from 'react';
import City from './City'

export default function WeatherCity() {
    const [addedCityNames, setAddedCityNames] = useState([]);
    const [cityName, setCityName] = useState('');
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState(null);
    const inputRef = useRef(null);

    const apiKey = "495e30fc25a93199c888e39a9fe1ef1e";
    const urlGeoLoc = (latitude, longitude) => `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    useEffect(() => {
        const fetchData = () => {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const { coords } = position;

                setLat(coords.latitude);
                setLong(coords.longitude);

                const apiUrlToEndpoint = urlGeoLoc(coords.latitude, coords.longitude);
                const response = await fetch(apiUrlToEndpoint)
                const data = await response.json();

                setData(data);
                console.log(data);
            });
        };

        fetchData() 
        
    }, []);

    function handleInput(event) {
        const { target } = event;
        setCityName(target.value);
    }

    function handleOnKeyEvent(event) {
        if(event.charCode === 13) {
            setAddedCityNames(state => [...state, cityName])
            inputRef.current.value = ''
        }
        
    }

    function handleAddClick () {
        setAddedCityNames(state => [...state, cityName])
        inputRef.current.value = ''
    }

    return (
        <div className="weather-by-city-container">
            <div className='content'>
                <div className='search-container'>
                    <input 
                        ref={inputRef}
                        className='input-element'
                        placeholder='enter city'
                        onInput={handleInput}
                        onKeyPress={handleOnKeyEvent}
                        defaultValue={cityName}
                    />
                    <button className='add-button button' onClick={handleAddClick} >Add</button>
                    
                </div>
                <div className='result-container'>
                    <div className='list-caption'>List of city you search:</div>
                    <ul className='list-element'>
                        { data && <City name={data.name} /> }
                        {
                            addedCityNames.map(cityName => <City  key={cityName} name={cityName}/>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
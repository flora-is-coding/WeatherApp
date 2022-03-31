import { useEffect, useState} from 'react';
import {ReactComponent as TempIcon} from './temp_icon.svg';
import { Link } from 'react-router-dom';

const apiKey = "495e30fc25a93199c888e39a9fe1ef1e";
const urlCityName = (cityName) => `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;


function City(props) {
    const { name } = props;
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(urlCityName(name))
        .then(resp => resp.json())
        .then(data => setData(data))
    }, []);

    console.log(data)

    if (!data) {
        return <li className="list-item">
            {name} - loading...
        </li>
    }

    const linkPath = ('/Weather/' + name)

    return (
        <li className="list-item">
            <Link className='link-element' to={linkPath} >{name}</Link>  {(data.main.temp).toFixed(1)}°C <TempIcon className='temp_icon'/>
            
        </li>
    );
}

export default City;
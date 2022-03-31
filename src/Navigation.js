import { Link } from "react-router-dom"

export default function Navigation () {
    return (
        <div className="navigation-bar">
            <Link to='/'>Home</Link>
            <Link to='/WeatherByGeolocation'>Weather by Geolocation</Link>
            <Link to='/WeatherByCityName'>Weather by City Name</Link>
        </div>
        
    )
}
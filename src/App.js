import './App.css';
import WeatherGeo from './WeatherGeo';
import WeatherCity from './WeatherCity';
import {Routes, Route, useLocation} from 'react-router-dom';
import Home from './Home';
import Weather from './Weather';
import Navigation from './Navigation';

function App() {
  const location = useLocation();
  return (
    <div className='App'>
      {location.pathname !== '/' && <Navigation /> }
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='WeatherByGeolocation' element={ <WeatherGeo/> } />
        <Route path='WeatherByCityName' element={ <WeatherCity />} />
        <Route path='Weather/:name' element={ <Weather />} />
      </Routes>
    </div>
  );
}

export default App;

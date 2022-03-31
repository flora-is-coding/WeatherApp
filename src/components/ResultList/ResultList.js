import { Link } from "react-router-dom";

export function ResultList (props) {
    const citiesList = props.citiesList;
    return (
        <>
             {citiesList.map((city, index) => <Link to={'/Weather/' + city.name} className='result__link' ><li className="list__item" key={index} >{city.name} {(city.main.temp).toFixed(1)}°C</li> </Link> )} 
        </>
    )
}
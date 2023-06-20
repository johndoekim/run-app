import { useEffect, useState } from "react";
import CityData from "./CityData";
import GetWeather from "./GetWeather";

const GetLocation = () =>{

    useEffect(() => {
        setLocation(CityData)
    }, [])
    

    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    

    const handlerLocationChange = (e) => {
        setSelectedLocation(location.find(dl => dl.dong === e.target.value));
      }
      console.log(selectedLocation)


    return(<>
                <select value={selectedLocation} onChange={handlerLocationChange}>
                    {location.map(dl => { return(
                        <option>{dl.dong}</option>
                    )})}
                </select>

                <GetWeather selectedLocation ={selectedLocation} />
    </>)
}
export default GetLocation;
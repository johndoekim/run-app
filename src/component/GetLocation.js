import { useEffect, useState } from "react";

const GetLocation = () =>{

    const [location, setLocation] = useState([]);

    const DummyLocation = [
        {
        location : '강남구' ,
        x : "61",
        y: "125",
    },
    {
        location : '서초구',
        x: '61',
        y : '124'
    },
        {
        location : '강동구',
        x: '62',
        y: '126'
    }
    ]


    console.log(DummyLocation);



    useEffect(() => {
        setLocation(DummyLocation)
    }, [])
    
    const handlerLocationSelect = (e) =>{
        console.log(e);
        setLocation(location(e.target.select));
    }



    return(<>

    
    {/* to do select onChange handler */}

                <select onSelect={handlerLocationSelect}>
                    {location.map(dl => { return(
                        <option>{dl.location}</option>
                    )})}
                </select>
  
    
    
    
    </>)
}
export default GetLocation;
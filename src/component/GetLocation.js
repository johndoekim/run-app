import { useState } from "react";

const GetLocation = () =>{

    const [location, setLocation] = useState([]);

    const DummyLocation = [{
        location : '강남구' ,
        x : "61",
        y: "125",
    },{
        location : '서초구',
        x: '61',
        y : '124'}
    ]


    return(<>

    
    <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>

    </select>
    
    
    
    
    </>)
}
export default GetLocation;
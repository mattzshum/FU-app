import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import LocationTile from './LocationTile';

const LocationList = () => {
    const [locationList, setLocationList] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/locations')
             .then(res => {
                 setLocationList(res.data.locations)
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>LOCATION LIST</h1>
            {locationList && locationList.map(location => (
                // <div key={location.id}>{location.id}</div>
                <div><LocationTile  id={location.id} name={location.name}/></div>
            ))}
        </div>
    )
}

export default LocationList;
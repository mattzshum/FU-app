import React from "react";
import LocationList from '../components/LocationList';
import CreateLocation from '../components/CreateLocation';

const Locations = () => {
    return(
        <div>
            <h1>LOCATIONS</h1>
            <CreateLocation />
            <div><LocationList /></div>
        </div>
    )
}

export default Locations;
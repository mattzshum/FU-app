import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';

const LocationTile = (props) => {
    return(
        <div>
            <h2><Link id='specific_location' to={`/locations/${props.id}`}>{props.id} : {props.name}</Link></h2>
        </div>
    )
}

export default LocationTile;
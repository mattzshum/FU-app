import React, {Component, useEffect, useState} from "react";

const LocationTile = (props) => {
    return(
        <div>
            <h2>{props.id} : {props.name}</h2>
        </div>
    )
}

export default LocationTile;
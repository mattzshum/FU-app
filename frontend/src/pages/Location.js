import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';

const Location = ({match}) =>{
    const [location, setLocation] = useState({});
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/locations/${match.params.id}`)
             .then(res => {
                 setLocation(res.data.location)
                 console.log(res.data)
             })
             .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <p>{location.id}</p>
            <h1>{location.name}</h1>
        </div>
    )
}

export default Location;
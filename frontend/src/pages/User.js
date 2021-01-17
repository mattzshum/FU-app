import React, {Component, useEffect, useState} from "react";
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';

const User = ({match}) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/users/${match.params.id}`)
             .then(res => {
                 setUser(res.data.user)
                 console.log(res.data)
             })
             .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <p>{user.id}</p>
            <h1>{user.f_name} {user.l_name}</h1>
            <h3>{user.u_name}</h3>
            <p>phone: {user.phone}</p>
        </div>
    )
}

export default User;
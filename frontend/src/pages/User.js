import React, {Component, useEffect, useState} from "react";
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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
        <StyledUserPage>
            {/* <p>{user.id}</p> */}
            <h1>{user.f_name} {user.l_name}</h1>
            <h3>{user.u_name}</h3>
            <p>phone: {user.phone}</p>
        </StyledUserPage>
    )
};

const StyledUserPage = styled.a`
    /* display: ; */
    text-align: left;
    margin:auto;
    justify-content: space-between;
    align-items:center;
    /* background-color:; */

`;

export default User;
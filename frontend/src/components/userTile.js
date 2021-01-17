import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';

const UserTile = (props) => {

    return(
        <div>
            <h3>gen info</h3>
            <p><Link id='specific_user' to={`/users/${props.id}`}>{props.id} : {props.f_name} {props.l_name}</Link></p>
            <h4>contact info</h4>
            <p><i>user_name: {props.u_name} phone: {props.phone}</i></p>
        </div>
    )
}

export default UserTile;
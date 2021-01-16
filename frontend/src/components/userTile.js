import React, {Component, useEffect, useState} from "react";

const UserTile = (props) => {

    return(
        <div>
            <h3>gen info</h3>
            <p>{props.id} : {props.f_name} {props.l_name}</p>
            <h4>contact info</h4>
            <p><i>user_name: {props.u_name} phone: {props.phone}</i></p>
        </div>
    )
}

export default UserTile;
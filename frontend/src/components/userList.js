import React, {Component, useEffect, useState} from "react";
//import "./App.css" TODO: implement CSS
import axios from "axios";
import UserTile from './userTile'

const UserList = () => {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/users')
             .then(res => {
                setUserList(res.data.users)
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    },[]);

    return(
        <div>
            <h1>USER LIST</h1>
            {userList && userList.map(user => (
                <div key={user.id}><UserTile id={user.id} f_name={user.f_name} l_name={user.l_name} u_name={user.u_name} phone={user.phone}/></div>
            ))}
        </div>
    )
}

export default UserList;
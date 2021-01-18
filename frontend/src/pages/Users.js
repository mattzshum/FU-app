import React from "react";
import UserList from '../components/userList';
import CreateUser from '../components/createUser'

const Users = () => {
    return(
        <div>
            <CreateUser />
            <h1>USERS</h1>
            <button>CREATE USERS</button>
            <div><UserList /></div>
        </div>
    )
}

export default Users;
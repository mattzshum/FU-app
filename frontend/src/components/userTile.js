import axios from "axios";
import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';

class UserTile extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.id)

        axios.delete(`http://127.0.0.1:5000/users/${this.props.id}`)
             .then(res => {
                 console.log(res);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                <h3>gen info</h3>
                <p><Link id='specific_user' to={`/users/${this.props.id}`}>{this.props.id} : {this.props.f_name} {this.props.l_name}</Link></p>
                <h4>contact info</h4>
                <p><i>user_name: {this.props.u_name} phone: {this.props.phone}</i></p>
                <form onSubmit={this.handleSubmit}>
                    <button type='submit'>DELETE</button>
                </form>
            </div>
        )
    }
}

export default UserTile;
import axios from "axios";
import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

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
            <StyledUser>
                <h3><Link id='specific_user' to={`/users/${this.props.id}`}>{this.props.u_name}</Link></h3>
                <p><i>{this.props.f_name} {this.props.l_name}</i></p>
                <p>member since: {this.props.date_created}</p>
                <form onSubmit={this.handleSubmit}>
                    <button type='submit'>DELETE</button>
                </form>
            </StyledUser>
        )
    }
};

const StyledUser = styled.a`
    display:block-size;
    a{
        color:black;
        text-decoration:none;
    }
`


export default UserTile;
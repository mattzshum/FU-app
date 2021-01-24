import axios from "axios";
import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';

class LocationTile extends Component{
    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.props.id);
        axios.delete(`http://127.0.0.1:5000/locations/${this.props.id}`)
             .then(res => {
                 console.log(res);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                <h3>{this.props.id} : {this.props.name}</h3>
                <form onSubmit={this.handleSubmit}>
                    <button type='submit'>DELETE</button>
                </form>
            </div>
        )
    }
}

export default LocationTile;
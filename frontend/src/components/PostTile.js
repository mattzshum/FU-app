import axios from "axios";
import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';

class PostTile extends Component{
    handleSubmit = (event) => {
        event.preventDefault();

        axios.delete(`http://127.0.0.1:5000/posts/${this.props.id}`)
             .then(res => {
                 console.log(res);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                <h2><Link id='specific_post' to={`/posts/${this.props.id}`}>{this.props.id} : {this.props.title}</Link></h2>
                <p>{this.props.body}</p>
                <p>{this.props.num_fu}</p>
                <p>{this.props.tag}</p>
                <form onSubmit={this.handleSubmit}>
                    <button type='submit'>DELETE</button>
                </form>
            </div>
        )
    }
}   

export default PostTile;
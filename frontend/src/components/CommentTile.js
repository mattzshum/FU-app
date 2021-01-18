import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CommentTile extends Component{

    handleSubmit = (event) => {
        event.preventDefault();

        axios.delete(`http://127.0.0.1:5000/comments/${this.props.id}`)
             .then(res => {
                 console.log(res);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                <h3>Post ID: {this.props.post_id}</h3>
                <h5>User ID: {this.props.user_id}</h5>
                <p><Link id='specific_comment' to={`/comments/${this.props.id}`}>{this.props.body}</Link></p>
                <form onSubmit={this.handleSubmit}>
                    <button type='submit'>DELETE</button>
                </form>
            </div>
        )
    }
    
}

export default CommentTile;
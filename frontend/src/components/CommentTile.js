import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

class CommentTile extends Component{
    state = {
        user: {}
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/users/${this.props.user_id}`)
             .then(res => {
                 console.log(res.data);
                 const user = res.data.user;
                 this.setState({ user });
             })
             .catch(err => console.log(err));
    }

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
            <StyledCommentTile>
                {/* <h3>Post ID: {this.props.post_id}</h3> */}
                <p><Link id='specific_comment' to={`/comments/${this.props.id}`}>{this.props.body}</Link></p>
                <p><i>-{this.state.user.u_name}</i></p>
                <p>commented on: {this.props.date_created}</p>
                <form onSubmit={this.handleSubmit}>
                    <button className='arrow' type='submit'>DELETE</button>
                </form>
            </StyledCommentTile>
        )
    };
};

const StyledCommentTile = styled.a`
    display:block;
    button {
        position: relative;
        //display:block;
        height: 25px;
        width: 60px;
        margin: 10px 7px;
        padding: 5px 5px;
        font-weight: 700;
        font-size: 9px;
        letter-spacing: 2px;
        color: #383736;
        border: 2px #383736 solid;
        border-radius: 4px;
        text-transform: uppercase;
        outline: 0;
        overflow:hidden;
        background: none;
        z-index: 1;
        cursor: pointer;
        transition:         0.08s ease-in;
        -o-transition:      0.08s ease-in;
        -ms-transition:     0.08s ease-in;
        -moz-transition:    0.08s ease-in;
        -webkit-transition: 0.08s ease-in;
    }       
    .arrow:hover:before{
        left:84%auto;
        opacity:1;
    }
    .arrow:hover{
        width:170px;
    }
    .arrow:before{
        content:"→";
        position:absolute;
        color:383736;
        left:83%;
        opacity:0;
        -webkit-transition: all 250mx cubic-bezier(0.680, -0.550, 0.265, 1.550);
    }
`;

export default CommentTile;
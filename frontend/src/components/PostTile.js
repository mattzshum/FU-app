import axios from "axios";
import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';

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
            <StyledPostTile>
                <h2><Link id='specific_post' to={`/posts/${this.props.id}`}>{this.props.title}</Link></h2>
                <p>{this.props.body}</p>
                <p>{this.props.num_fu}</p>
                <p>posted on: {this.props.date_created}</p>
                <p>{this.props.tag}</p>
                <form onSubmit={this.handleSubmit}>
                    <button className='arrow' type='submit'>DELETE</button>
                </form>
            </StyledPostTile>
        )
    }
}

const StyledPostTile = styled.a`
    display:block;
    button {
        position: relative;
        //display:block;
        height: 35px;
        width: 100px;
        margin: 10px 7px;
        padding: 5px 5px;
        font-weight: 700;
        font-size: 15px;
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

export default PostTile;
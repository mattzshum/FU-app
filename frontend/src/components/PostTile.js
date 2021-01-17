import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';

const PostTile = (props) => {
    return(
        <div>
            <h2><Link id='specific_post' to={`/posts/${props.id}`}>{props.id} : {props.title}</Link></h2>
            <p>{props.body}</p>
            <p>{props.num_fu}</p>
            <p>{props.tag}</p>
        </div>
    )
}

export default PostTile;
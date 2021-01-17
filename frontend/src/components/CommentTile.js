import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const CommentTile = (props) => {
    return(
        <div>
            <h3>Post ID: {props.post_id}</h3>
            <h5>User ID: {props.user_id}</h5>
            <p><Link id='specific_comment' to={`/comments/${props.id}`}>{props.body}</Link></p>
        </div>
    )
}

export default CommentTile;
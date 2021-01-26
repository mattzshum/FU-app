import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';

const Comment = ({match}) => {
    const [comment, setComment] = useState({});
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/comments/${match.params.id}`)
             .then(res => {
                 setComment(res.data.comment)
                 console.log(res.data)
             })
             .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <p>{comment.id}</p>
            <p>{comment.body}</p>
        </div>
    )
}

export default Comment;
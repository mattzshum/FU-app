import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import CommentTile from './CommentTile';

const CommentList = () => {
    const [commentList, setCommentList] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/comments')
             .then(res => {
                 setCommentList(res.data.comments)
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }, []);

    return(
        <div>
            {commentList && commentList.map(comment => (
                <div key={comment.id}> <CommentTile id={comment.id} body={comment.body} post_id={comment.post_id} prev={comment.prev} user_id={comment.user_id}/> </div>
            ))}
        </div>
    )
}

export default CommentList;
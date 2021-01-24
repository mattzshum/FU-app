import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import CommentTile from '../components/CommentTile';

const Post = ({ match }) => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState({});
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/posts/${match.params.id}`)
             .then(res => {
                 setPost(res.data.post);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
        axios.get(`http://127.0.0.1:5000/comments/user-comments/${post.user_id}`)
             .then(res => {
                 setComments(res.data.comments);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
        axios.get(`http://127.0.0.1:5000/users/${post.user_id}`)
             .then(res => {
                 setUser(res.data.user);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div>
                <p>{user.f_name}</p>
            </div>
            <div>
                <p>{post.id}</p>
                <h1>{post.title}</h1>
                <h3>{post.user_id}</h3>
                <p>{post.body}</p>
                <p>{post.num_fu}</p>
            </div>
            <div>
                {comments && comments.map(comment => (
                    <div key={comment.id}> <CommentTile id={comment.id} body={comment.body} post_id={comment.post_id} prev={comment.prev} user_id={comment.user_id}/> </div>
                ))}
            </div>
        </div>
    )
}

export default Post;
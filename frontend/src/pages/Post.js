import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';

const Post = ({ match }) => {
    const [post, setPost] = useState({});
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/posts/${match.params.id}`)
             .then(res => {
                 setPost(res.data.post)
                 console.log(res.data)
             })
             .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <p>{post.id}</p>
            <h1>{post.title}</h1>
            <h3>{post.user_id}</h3>
            <p>{post.body}</p>
            <p>{post.num_fu}</p>
        </div>
    )
}

export default Post;
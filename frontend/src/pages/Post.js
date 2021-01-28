import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import CommentTile from '../components/CommentTile';
import styled from 'styled-components';
import CreateComment from '../components/createComment';

const Post = ({ match }) => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/posts/${match.params.id}`)
             .then(res => {
                 setPost(res.data.post);
                 setComments(res.data.comments);
                 setUser(res.data.user);
                 console.log(res.data);
             })
             .catch(err => console.log(err));         
    }, []);

    return (
        <div>
            <StyledPost>
                <h1>{post.title}</h1>
                <p className='user'>{user.f_name} {user.l_name}</p>
                <p className='body'>{post.body}</p>
                <p>{post.num_fu}</p>
            </StyledPost>
            <StyledCreateComment>
                <CreateComment post_id={post.id} user_id={post.user_id}/>
            </StyledCreateComment>
            <StyledComment>
                {comments && comments.map(comment => (
                    <div key={comment.id}> <CommentTile id={comment.id} body={comment.body} post_id={comment.post_id} prev={comment.prev} user_id={comment.user_id}/> </div>
                ))}
            </StyledComment>
        </div>
    );
};

const StyledPost = styled.a`
    display: block;
    margin:auto;
    /* font-family: 'Courier New', Courier, monospace; */
    h1{
        text-align:left;
        padding-left: 10%;
    }
    .user{
        text-align:left;
        padding-left:14%;
        font-style:italic;
    }
    .body{
        text-align:left;
        padding-left:17%;
    }
`;

const StyledCreateComment = styled.a`
    display:block;
    padding-left:17%;
`

const StyledComment = styled.a`
    display:block;
    padding-left:17%;
    a{
        color:black;
        text-decoration:none;
    }
`;

export default Post;
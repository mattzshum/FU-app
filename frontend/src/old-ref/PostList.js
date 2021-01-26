import React, {Component, useEffect, useState} from "react";
//import "./App.css" TODO: implement CSS
import axios from "axios";
import PostTile from './PostTile';
import styled from 'styled-components';

const PostList = () => {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/posts')
             .then(res => {
                setPostList(res.data.posts)
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    },[]);

    return(
        <div>
            <StyledPost>
                {postList && postList.map(post => (
                    <PostTile key={post.id} id={post.id} body={post.body} num_fu={post.num_fu} tag={post.tag} title={post.title}/>
                ))}
            </StyledPost>
        </div>
    )
}

const StyledPost = styled.a`
    display:block;
    padding-left: 5%;
    a{
        color:black;
        text-decoration:none;
    }
`

export default PostList;
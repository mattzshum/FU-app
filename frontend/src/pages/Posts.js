import React from "react";
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';

const Posts = () => {
    return(
        <div>
            <h1>POSTS</h1>
            <CreatePost />
            <div><PostList/></div>
        </div>
    )
}

export default Posts;
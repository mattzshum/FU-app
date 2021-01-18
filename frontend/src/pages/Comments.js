import React from 'react';
import CommentList from '../components/CommentList';
import styled from 'styled-components';
import CreateComment from '../components/createComment'

const Comments = () => {

    return(
        <styledComment>
            <CreateComment></CreateComment>
            <h1>COMMENTS</h1>
            <div><CommentList/></div>
        </styledComment>
    )
}

export default Comments;
import React from 'react';
import CommentList from '../components/CommentList';
import styled from 'styled-components';

const Comments = () => {

    return(
        <styledComment>
            <button>Create</button>
            <h1>COMMENTS</h1>
            <div><CommentList/></div>
        </styledComment>
    )
}

export default Comments;
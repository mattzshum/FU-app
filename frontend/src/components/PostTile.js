import React, {Component, useEffect, useState} from "react";

const PostTile = (props) => {
    return(
        <div>
            <h2>{props.id} : {props.title}</h2>
            <p>{props.body}</p>
            <p>{props.num_fu}</p>
            <p>{props.tag}</p>
        </div>
    )
}

export default PostTile;
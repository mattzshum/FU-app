import React, { Component } from "react";
// import PostList from '../components/PostList';
// import CreatePost from '../components/CreatePost';`
import styled from 'styled-components';
import axios from 'axios';
import PostTile from '../components/PostTile';

class Posts extends Component{
    state={
        title:null,
        body:null,
        num_fu:0, //integer remember
        tag:[], //array implement later later
        user_id:null, //integer remember
        postList:[],
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/posts`)
             .then(res => {
                 console.log(res.data);
                 const postList = res.data.posts;
                 this.setState({postList});
             })
             .catch(err => console.log(err));
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            title:this.state.title,
            body:this.state.body,
            num_fu:this.state.num_fu,
            tag:this.state.tag,
            user_id:this.state.user_id,
        }
        console.log(data)

        axios.post(`http://127.0.0.1:5000/posts`, data)
             .then(res => {
                //  console.log(data);
                //  console.log(res);
                //  console.log(res.data);
                 const fresh_post = res.data.created;
                 this.state.postList.push(fresh_post);
             })
             .catch(err => console.log(err));
    }
    
    render(){
        return(
            <div>
                <h1>POSTS</h1>
                <StyledCreatePost>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type='text' placeholder='title..' name='title' onChange={this.handleChange} />
                            <input type='text' placeholder='contents..' name='body' onChange={this.handleChange} />
                            <input type='number' placeholder='user id..' name='user_id' onChange={this.handleChange} />
                        </label>
                        <button className='arrow' type='submit'>SUBMIT</button>
                    </form>
                </StyledCreatePost>
                <StyledPost>
                    {this.state.postList && this.state.postList.map(post => (
                    <PostTile key={post.id} id={post.id} body={post.body} num_fu={post.num_fu} tag={post.tag} title={post.title}/>
                    ))}
                </StyledPost>
            </div>
        )
    }
}

const StyledCreatePost = styled.a`
    display:block;
    padding-left:5%;
`

const StyledPost = styled.a`
    display:block;
    padding-left: 5%;
    a{
        color:black;
        text-decoration:none;
    }
`

export default Posts;
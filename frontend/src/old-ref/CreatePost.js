import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';

class CreatePost extends Component{
    state={
        title:null,
        body:null,
        num_fu:0, //integer remember
        tag:[], //array implement later later
        user_id:null, //integer remember
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
                 console.log(data);
                 console.log(res);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }

    render() {
        return (
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
        )
    };
};

const StyledCreatePost = styled.a`
    background-color: #f2f2f2;
    display: block;
    form{
        display: inline-block;
        margin:auto;
    }
    input{
        padding: 12px 20px;
        margin: 8px 0;
        border: 1px solid #ccc;
        height:10px;
    }
    button {
        position: relative;
        //display:block;
        height: 37px;
        width: 100px;
        margin: 10px 7px;
        padding: 5px 5px;
        font-weight: 700;
        font-size: 15px;
        letter-spacing: 2px;
        color: #383736;
        border: 2px #383736 solid;
        border-radius: 4px;
        text-transform: uppercase;
        outline: 0;
        overflow:hidden;
        background: none;
        z-index: 1;
        cursor: pointer;
        transition:         0.08s ease-in;
        -o-transition:      0.08s ease-in;
        -ms-transition:     0.08s ease-in;
        -moz-transition:    0.08s ease-in;
        -webkit-transition: 0.08s ease-in;
    }       
    .arrow:hover:before{
        left:84%auto;
        opacity:1;
    }
    .arrow:hover{
        width:170px;
    }
    .arrow:before{
        content:"→";
        position:absolute;
        color:383736;
        left:83%;
        opacity:0;
        -webkit-transition: all 250mx cubic-bezier(0.680, -0.550, 0.265, 1.550);
    }
`

export default CreatePost;
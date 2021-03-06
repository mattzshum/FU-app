import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';

class CreateComment extends Component{
    state = {
        body:null,
        post_id:this.props.post_id,
        prev:null,
        user_id:null,
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        // console.log({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.props.post_id);
        console.log(this.state.post_id);

        const data = {
            body:this.state.body,
            post_id:this.props.post_id,
            prev:this.state.prev,
            user_id:parseInt(this.state.user_id, 10),
        }
        console.log(data);

        axios.post(`http://127.0.0.1:5000/comments`, data)
             .then(res => {
                 console.log(data);
                 console.log(res);
                 console.log(res.data);
             })
             .catch(err => console.log(err));
    }

    render() {
        return(
            <StyledCreateComment>
                <p>Comment</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type='text' name='body' placeholder='comment..' onChange={this.handleChange} />
                        <input type='number' name='user_id' placeholder='user id..' onChange={this.handleChange} />
                    </label>
                    <button className='arrow' type='submit'>post</button>
                </form>
            </StyledCreateComment>
        )
    };
};

const StyledCreateComment = styled.a`
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
    }
    button {
        position: relative;
        //display:block;
        height: 40px;
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

export default CreateComment;
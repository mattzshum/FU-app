import React, {Component} from 'react';
import axios from 'axios';

class CreateComment extends Component{
    state = {
        body:null,
        post_id:null,
        prev:null,
        user_id:null,
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        // console.log({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            body:this.state.body,
            post_id:parseInt(this.state.post_id, 10),
            prev:parseInt(this.state.prev, 10),
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
            <div>
                <p>body-postID-prev-userID</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person body:
                        <input type='text' name='body' onChange={this.handleChange} />
                        <input type='number' name='post_id' onChange={this.handleChange} />
                        <input type='number' name='prev' onChange={this.handleChange} />
                        <input type='number' name='user_id' onChange={this.handleChange} />
                    </label>
                    <button type='submit'>SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default CreateComment;
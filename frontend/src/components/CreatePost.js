import React, {Component} from 'react';
import axios from 'axios';

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
            <div>
                <p>title-body-num_fu-user_id</p>
                 <form onSubmit={this.handleSubmit}>
                     <label>
                         Post body:
                         <input type='text' name='title' onChange={this.handleChange} />
                         <input type='text' name='body' onChange={this.handleChange} />
                         <input type='number' name='user_id' onChange={this.handleChange} />
                     </label>
                     <button type='submit'>SUBMIT</button>
                 </form>
            </div>
        )
    }
}

export default CreatePost;
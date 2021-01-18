import React, {Component} from 'react';
import axios from 'axios';

class CreateLocation extends Component{
    state={
        name:null,
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name:this.state.name,
        }
        console.log(data);

        axios.post(`http://127.0.0.1:5000/locations`, data)
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
                <p>name</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type='text' name='name' onChange={this.handleChange} />
                    </label>
                    <button type='submit'>SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default CreateLocation;
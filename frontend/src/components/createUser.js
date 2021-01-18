import React, {Component} from 'react';
import axios from 'axios';

class CreateUser extends Component{
    state={
        f_name:'',
        l_name:null,
        u_name:null,
        phone:null,
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            f_name:this.state.f_name,
            l_name:this.state.l_name,
            u_name:this.state.u_name,
            phone:this.state.phone
        }
        console.log(data);

        axios.post(`http://127.0.0.1:5000/users`, data)
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
                <p>f_name-l_name-u_name-phone</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        User body:
                        <input type='text' name='f_name' onChange={this.handleChange} />
                        <input type='text' name='l_name' onChange={this.handleChange} />
                        <input type='text' name='u_name' onChange={this.handleChange} />
                        <input type='text' name='phone' onChange={this.handleChange} />
                    </label>
                    <button type='submit'>SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default CreateUser;
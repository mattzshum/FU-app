import React, { Component } from "react";
// import UserList from '../components/userList';
import UserTile from '../components/userTile';
import styled from 'styled-components';
import axios from "axios";

class Users extends Component {
    state = {
        f_name:'',
        l_name:null,
        u_name:null,
        phone:null,
        userList:[],
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/users`)
             .then(res => {
                 console.log(res.data);
                 const userList = res.data.users;
                 this.setState({userList});
             })
             .catch(err => console.log(err));
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            f_name:this.state.f_name,
            l_name:this.state.l_name,
            u_name:this.state.u_name,
            phone:this.state.phone,
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

    render(){
        return(
            <div>
                <h1>USERS</h1>
                <StyledCreateUser>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type='text' name='f_name' placeholder='first name..' onChange={this.handleChange} />
                            <input type='text' name='l_name' placeholder='last name..' onChange={this.handleChange} />
                            <input type='text' name='u_name' placeholder='user name..' onChange={this.handleChange} />
                            <input type='text' name='phone' placeholder='phone' onChange={this.handleChange} />
                        </label>
                        <button className='arrow' type='submit'>SUBMIT</button>
                    </form>
                </StyledCreateUser>
            <StyledUser>
                {this.state.userList && this.state.userList.map(user => (
                    <UserTile id={user.id} f_name={user.f_name} l_name={user.l_name} u_name={user.u_name} phone={user.phone} date_created={user.date_created}/>
                ))}
            </StyledUser>
        </div>
        )
    }
};

const StyledCreateUser = styled.a`
    display:block;
    padding-left:5%;
    button {
        position: relative;
        //display:block;
        height: 35px;
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

const StyledUser = styled.a`
    display:block;
    padding-left:5%;
`;

export default Users;
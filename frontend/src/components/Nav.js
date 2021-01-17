import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Nav = () => {
    return(
        <StyledNav>
            <h1><Link id='MainPage' to='/'>FUCK YOU</Link></h1>
            <ul>
                <li><Link id='Users' to='/users'>Users</Link></li>
                <li><Link id='Posts' to='/posts'>Posts</Link></li>
                <li><Link id='Locations' to='/locations'>Locations</Link></li>
                <li><Link id='Comments' to='/comments'>Comments</Link></li>
            </ul>
        </StyledNav>
    );
};

const StyledNav = styled.a`
  min-height: 10vh;
  display:flex;
  margin:auto;
  justify-content: space-between;
  align-items:center;
  padding: 1rem 10rem;
  background: #282828;
  a{
      color: white;
      text-decoration: none;
  }
  ul{
      display: flex;
      list-style:none;
  }
  li{
      padding-left: 10rem;
      position: relative;
  }
`;


export default Nav;
import logo from './logo.svg';
import './App.css';
import UserList from './components/userList'
import PostList from './components/PostList'
import LocationList from './components/LocationList'
import Locations from './pages/Locations'
import Users from './pages/Users'
import Posts from './pages/Posts'
import Nav from './components/Nav'
import { Switch, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Nav/>
      <h1>FU App</h1>
      <p>Welcome</p>
      <Switch>
        <Route path='/users' exact component={Users} />
        <Route path='/posts' exact component={Posts} />
        <Route path='/locations' exact component={Locations} />
      </Switch>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Locations from './pages/Locations'
import Location from './pages/Location'
import Users from './pages/Users'
import User from './pages/User'
import Posts from './pages/Posts'
import Post from './pages/Post'
// import Comments from './pages/Comments'
// import Comment from './pages/Comment'
import Nav from './components/Nav'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Nav/>
      {/* <h1>FU App</h1>
      <p>Welcome</p> */}
      
      <Switch>
        <Route path='/users' exact component={Users} />
        <Route path='/posts' exact component={Posts} />
        <Route path='/locations' exact component={Locations} />
        {/* <Route path='/comments' exact component={Comments} /> */}

        <Route path='/users/:id' exact component={User}/>
        <Route path='/posts/:id' exact component={Post}/>
        <Route path='/locations/:id' exact component={Location}/>
        {/* <Route path='/comments/:id' exact component={Comment}/> */}
      </Switch>
    </div>
  );
}

export default App;

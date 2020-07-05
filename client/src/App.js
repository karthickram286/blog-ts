import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import Login from './components/login';
import Logout from './components/logout';
import Register from './components/register';
import CreatePost from './components/create-post';
import Footer from './components/footer';
import ViewAllPosts from './components/view-all-posts';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component = { Homepage } />
        <Route exact path="/login" component = { Login } />
        <Route exact path="/logout" component = { Logout } />
        <Route exact path="/register" component = { Register } />
        <Route exact path="/create" component = { CreatePost } />
        <Route exact path="/view" component = { ViewAllPosts } />
      </Switch>

      <Footer content="© 2020 Copyright: blogger-ts.com" />
    </div>
  );
}

export default App;

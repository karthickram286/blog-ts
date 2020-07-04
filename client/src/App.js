import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import Login from './components/login';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component = { Homepage } />
        <Route exact path="/" component = { Login } />
      </Switch>

      <Footer content="© 2020 Copyright: blogger-ts.com" />
    </div>
  );
}

export default App;

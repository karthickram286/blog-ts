import React from 'react';
import { Component } from 'react';
import NavIcon from './navicon';

import './styles/navbar.styles.css';

class Navbar extends Component {

  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    return (
      <div className="topnav">
        <NavIcon name="Blog Application" url="/" status="active" />
        <NavIcon name="Login" url="/login" status="" />
        <NavIcon name="Register" url="/register" status="" />
        <NavIcon name="Create Post" url="/create" status="" />
        <NavIcon name="View Posts" url="/view" status="" />
      </div>
    );
  }
}

export default Navbar;
import React from 'react';
// import axios from 'axios';
import { Button, Badge, FormGroup, FormControl, FormLabel, FormCheck } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import './styles/blog.styles.css';

class Login extends React.Component {

  constructor() { 
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      status: ''
    });
  }

  handleClick = event => {
    this.setState({
      [event.target.id]: event.target.checked,
      status: ''
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Login page</h1>
        <div className="login">
          <FormGroup controlId="username">
              <FormLabel color="blue">User Name</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
          </FormGroup>

          <FormGroup controlId="password">
              <FormLabel color="blue">First Name</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.password}
                onChange={this.handleChange}
              />
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
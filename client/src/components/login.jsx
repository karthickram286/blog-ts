import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Badge, FormGroup, FormControl, FormLabel } from 'react-bootstrap';


import './styles/blog.styles.css';

class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      status: ""
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

  handleSubmit = async (event) => {
    event.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    }
    
    try {
      let response = await axios.post('/v1/auth/login', user);
      this.setState({
        status: 'Successfully logged in'
      });
      this.setCookie(response.data.authToken);
      localStorage.setItem('userId', response.data.user_id);

      // Refresh page after 3 seconds
      setTimeout(() => { 
        window.location.reload(); 
      }, 3000);
    } catch (error) {
      this.setState({
        status: `Login failed: ${error.response.data}`
      });
    }
  }

  setCookie(authToken) {
    let date = new Date();
    date.setTime(date.getTime() + (60 * 60 * 1000)); // 1 hr
    let expiresIn = "expires="+ date.toUTCString();
    document.cookie = "authToken=" + authToken + ";" + expiresIn + ";path=/";
  }

  validateForm() {
    return (this.state.username.length > 3)
      && (this.state.password.length > 5);
  }

  render() {
    return (
      <div>
        <div className="login">
          <h2>
            Login
          </h2> <br />

          <form onSubmit={this.handleSubmit}>

            <FormGroup controlId="username">
              <FormLabel color="blue">Username</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup> <br />

            <FormGroup controlId="password">
              <FormLabel color="blue">Password</FormLabel>
              <FormControl
                autoFocus
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup> <br />

            <FormGroup>
              <center><Badge variant="info">{this.state.status}</Badge></center>
            </FormGroup>

            <Button
              block
              disabled={!this.validateForm()}
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
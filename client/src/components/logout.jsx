import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, FormGroup, Badge } from 'react-bootstrap';

import './styles/blog.styles.css';

class Logout extends React.Component {

  constructor() {
    super();

    this.state = {
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

    Cookies.remove('authToken');
    localStorage.removeItem('userId');

    this.setState({
      status: 'Sucessfully logged out'
    })

    // Refresh page after 2 seconds
    setTimeout(() => { 
      window.location.reload(); 
    }, 2000);
  }

  render() {
    return (
      <div>
        <div className="logout">
          <h2>Do you really want to logout?</h2> <br />
        </div>

        <FormGroup>
              <center><Badge variant="info">{this.state.status}</Badge></center>
        </FormGroup>

        <form onSubmit={this.handleSubmit}>
          <Button
            style={{marginRight: 15}} 
            className="btn btn-danger"
            type="submit"
          >
            Logout
        </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Logout);


import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import { Button, Badge, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './styles/blog.styles.css';

class CreatePost extends React.Component {

  constructor() {
    super();

    this.state = {
      title: "",
      body: "",
      status: ""
    }
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

    let post = {
      title: this.state.title,
      body: this.state.body,
      author_id: localStorage.getItem('userId')
    }

    try {
      await axios.post('/v1/posts/create', post, {
        headers: {
          "x-auth-token": Cookies.get('authToken')
        }
      });
      this.setState({
        status: `Post added successfully`
      });
    } catch (error) {
      this.setState({
        status: `Post can't be created: ${error.response.data}`
      });
    }
    
  };

  validateForm() {
    return (this.state.title.length > 2)
      && (this.state.body.length > 4);
  }

  render() {
    return (
      <div>
        <div className="create-post">
          <h2>
            Add Post
          </h2> <br />

          <form onSubmit={this.handleSubmit}>

            <FormGroup controlId="title">
              <FormLabel color="blue">Title</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </FormGroup> <br />

            <FormGroup controlId="body">
              <FormLabel color="blue">Body</FormLabel>
              <FormControl
                as="textarea"
                rows="5"
                autoFocus
                type="text"
                value={this.state.body}
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
              Add Post
            </Button>

          </form>

        </div>
      </div>
    )
  };
}

export default withRouter(CreatePost);
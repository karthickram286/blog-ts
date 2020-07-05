import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Badge, FormGroup, FormControl, FormLabel } from 'react-bootstrap';


import './styles/blog.styles.css';

class CreatePost extends React.Component {

  constructor() {
    super();

    this.state = {
      title: "",
      body: "",
      author_id: localStorage.getItem('userId'),
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

            <FormGroup controlId="username">
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
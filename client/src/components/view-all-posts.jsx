import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import './styles/blog.styles.css';

class ViewAllPosts extends React.Component {

  constructor() {
    super();

    this.state = {
      posts: [

      ]
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      status: ''
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  async fetchAllPosts() {
    axios.get('/v1/posts/')
      .then(response => response.data)
      .then(posts => {
        this.setState({ posts: posts});
      })
      .catch(err => {
        this.setState({ status: `Couldn't fetch posts` });
      });
  } 

  componentDidMount() {
    this.fetchAllPosts();
  }

  render() {
    return (
      <div>
        <div className="posts">

          <center>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Author</th>
                  <th>Published time</th>
                  <th>Last updated</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.posts.map(post => {
                    return (
                      <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>{post.author}</td>
                        <td>{post.createdAt}</td>
                        <td>{post.updatedAt}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </center>

        </div>
      </div>
    );
  }
}

export default withRouter(ViewAllPosts);
const assert = require('assert');
const axios = require('axios');

describe('Auth Routes API tests', () => {

  let app;
  let userId;
  let jwtToken;
  let postId;

  before(() => {
    app = require('../build/server');
  });

  describe('Post APIs', async () => {

    before(async () => {
      // creating a user
      let userResult = await axios.post('http://localhost:5000/v1/users/create', {
        username: "testuser",
        password: "password123"
      });
      userId = userResult.data.id;

      // Getting auth token
      let authResult = await axios.post('http://localhost:5000/v1/auth/login', {
        username: "testuser",
        password: "password123"
      });
      jwtToken = authResult.data.authToken;
    });

    after(async () => {
      await axios.delete(`http://localhost:5000/v1/users/delete/${userId}`);
    });

    it('should create a post', async () => {
      let response = await axios.post('http://localhost:5000/v1/posts/create', {
        "title": "Some Title",
        "body": "Body for the post",
        "author_id": userId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': jwtToken
        }
      });

      postId = response.data.id;

      assert.equal(response.status, 200);
      assert.equal(response.statusText, 'OK');
      assert.equal(response.data.title, 'Some Title');
      assert.equal(response.data.body, 'Body for the post');
      assert.equal(response.data.author_id, userId);
    });
  });

  describe ('GET', async () => {

    it ('should return a post by id', async () => {
      let response = await axios.get(`http://localhost:5000/v1/posts/${postId}`);

      assert.equal(response.status, 200);
      assert.equal(response.statusText, 'OK');
      assert.equal(response.data.id, postId);
      assert.equal(response.data.title, 'Some Title');
      assert.equal(response.data.body, 'Body for the post');
      assert.equal(response.data.author_id, userId);
    });

    it ('should return list of all post', async () => {
      let response = await axios.get('http://localhost:5000/v1/posts/');

      assert.equal(response.status, 200);
      assert.equal(response.statusText, 'OK');
      assert.equal(response.data.length <= 10, true);
    });
  });
});
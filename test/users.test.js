const assert = require('assert');
const axios = require('axios');

describe('User Routes API tests', () => {

  let app;
  let userId;

  before(() => {
    app = require('../build/server');
  });

  describe('POST', async () => {

    it('should create a user and return it', async () => {
      let response = await axios.post('http://localhost:5000/v1/users/create', {
        username: "testuser",
        password: "password123"
      });
      userId = response.data.id;

      assert.equal(response.status, 200);
      assert.equal(response.statusText, 'OK');
      assert.equal(response.data.username, 'testuser');
    });
  });

  describe('DELETE', async () => {

    it('should delete a user', async () => {
      let response = await axios.delete(`http://localhost:5000/v1/users/delete/${userId}`);

      assert.equal(response.status, 200);
      assert.equal(response.statusText, 'OK');
    });
  });
});
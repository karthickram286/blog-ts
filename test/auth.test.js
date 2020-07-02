const express = require('express');
const assert = require('assert');
const axios = require('axios');

describe('Auth Routes API tests', () => {

  let app;
  let userId;

  before(() => {
    app = require('../build/server');
  });

  describe('POST', async () => {

    beforeEach(async () => {
      // creating a user
      let result = await axios.post('http://localhost:5000/v1/users/create', {
        username: "testuser",
        password: "password123"
      });
      userId = result.data.id;
    });

    afterEach(async () => {
      await axios.delete(`http://localhost:5000/v1/users/delete/${userId}`);
    });

    it('should return the jsonwebtoken for the logged in user', async () => {

      // getting jwt                          
      let response = await axios.post('http://localhost:5000/v1/auth/login', {
        username: "testuser",
        password: "password123"
      });

      assert.equal(response.status, 200);
      assert.equal(response.statusText, 'OK');
    });
  });
});
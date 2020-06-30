const express = require('express');
const assert = require('assert');
const axios = require('axios');

describe ('User Routes API tests', () => {

  let app;

  before(() => {
    app = require('../build/server');
  });

  // after(() => {
  //   app.close();
  // });

  describe ('POST', async () => {

    it ('should create a user and return it', async () => {
      let response = await axios.post('http://localhost:5000/v1/users/create', {
                                  username: "testuser",
                                  password: "password123"
                                });

      assert.equal(response.status, 200);
      assert.equal(response.statusText, 'OK');
      assert.equal(response.data.username, 'testuser');            
    });
  });
});
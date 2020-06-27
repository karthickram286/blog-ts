import { RequestHandler } from 'express';
import uuid from 'uuid';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import {
  addUser,
  getUser
} from '../accessor/user.accessor';
import User from '../models/user.model';

/**
 * Adds a new User to the DB
 * @param req 
 * @param res 
 */
const createUser: RequestHandler = async (req, res) => {
  
  let { username, password } = req.body;
  let id: string = uuid.v4();

  
  if (_.isEmpty(getUser(username))) {
    const user = new User({
      id: id,
      username: username,
      password: getEncryptedPassword(password)
    });

    await addUser(user);

    res.status(200)
      .json(user);
  } else {
    res.status(409)
      .json(`Username already exists`);
  }
}

/**
 * Returns encrypted password
 * @param password 
 */
const getEncryptedPassword = async (password: string): Promise<string> => {

  let salt = await bcrypt.genSalt(6);
  let encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

const deleteUser: RequestHandler = async (req, res) => {

}

export {
  createUser,
  deleteUser
};
import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import {
  addUser,
  getUser
} from '../accessor/user.accessor';
import User from '../models/user.model';

/**
 * Adds a new User to the DB
 * 
 * @param req 
 * @param res 
 */
const createUser: RequestHandler = async (req, res) => {
  
  let { username, password } = req.body;
  let id: string = uuidv4();

  
  if (_.isEmpty(await getUser(username))) {
    const user = await User.create({
      id: id,
      username: username,
      password: await getEncryptedPassword(password)
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

  let salt: string = await bcrypt.genSalt(6);
  let encryptedPassword: string = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

// TODO
const deleteUser: RequestHandler = async (req, res) => {

}

export {
  createUser,
  deleteUser
};
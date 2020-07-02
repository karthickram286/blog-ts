import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import {
  addUser,
  getUser,
  getUserById,
  deleteUserById
} from '../accessor/user.accessor';
import { schemaValidate } from '../util/util';
import User from '../models/user.model';
import UserSchema from '../schema/user.schema';

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
    
    let userObj = {
      id: id,
      username: username,
      password: password
    };

    let isValid = await schemaValidate(UserSchema, userObj);
    
    if (isValid) {
      userObj.password = await getEncryptedPassword(password);
      const user = await User.create(userObj);
      await addUser(user);
    } else {
      return res.status(422)
        .json(`Invalid User object`);
    }

    return res.status(200)
      .json(userObj);
  } else {
    return res.status(409)
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

  let userId = req.params.id;

  const user = await getUserById(userId);

  if (!_.isEmpty(user)) {
    await deleteUserById(userId);
    return res.status(200)
      .json('User deleted successfully');
  }
  return res.status(404)
    .json(`UserId doesn't exists`);
}

export {
  createUser,
  deleteUser
};
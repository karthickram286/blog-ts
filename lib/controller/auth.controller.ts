import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { getJWT } from '../middleware/authorize.middleware';

import {
  getUser
} from '../accessor/user.accessor';

/**
 * Returns a JSON web token to the user
 * @param req 
 * @param res 
 * @returns authtoken
 */
const login: RequestHandler = async (req, res) => {

  let { username, password } = req.body;

  let user: any = await getUser(username);

  // If username is not present
  if (_.isEmpty(user)) {
    return res.status(404)
            .json(`Invalid email or password`);
  }

  const validPassword = await bcrypt.compare(password, _.get(user, 'password'));
  if (!validPassword) {
    return res.status(404)
            .json(`Invalid email or password`);
  }

  const token = getJWT(_.get(user, 'id'));
  return res.send({ 
    authToken: token,
    user_id: user.id
  });
};

export {
  login
};
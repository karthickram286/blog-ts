import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Request } from 'express';

const jwtPrivateKey: any = process.env.JWT_PRIVATE_KEY;


/**
 * Returns the JWT for given user id
 * @param id 
 * @returns jwt
 */
const getJWT = (id: any) => {
  return jwt.sign({
    id: id
  }, jwtPrivateKey, {
    expiresIn: '12h'    // JWT will expire in 12 hours
  });
};

/**
 * Authorizes the incoming request
 * @param req 
 * @param author_id 
 */
const authorize = (req: Request, author_id: string) => {

  const token = req.header('x-auth-token');
  
  // If token is not provided
  if (!token) {
    return {
      status: 403,
      message: 'Auth token not provided'
    }
  }

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    let decodedId = _.get(decoded, 'id');

    // If token didn't match with the passed author id
    if (!_.isEqual(decodedId, author_id)) {
      return {
        status: 401,
        message: `Invalid token`
      }
    }

    return {
      status: 200,
      message: 'Authorized'
    }
  } catch (error) {
    return {
      status: 401,
      message: `Invalid token`
    }
  }
}

export {
  getJWT,
  authorize
};
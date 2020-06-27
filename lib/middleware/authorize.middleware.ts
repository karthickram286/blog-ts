import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

const authorize: RequestHandler = (req, res, next) => {

  const token = req.header('x-auth-token');
  
  // If token is not provided
  if (!token) {
    return res.status(403).json('Auth token not provided');
  }

  try {
    const payload = jwt.verify(token, 'jwtPrivateKey');
    next();
  } catch (error) {
    return res.status(401).json(`Invalid token`);
  }
}

export default authorize;
import jwt from 'jsonwebtoken';
import db from '../db/index';
import models from '../models';

/**
 * @description jwt base authentication class
 * 
 * @method authenticate
 * @method verifyToken
 * @method verifyUserToken
 */
export default class {
  /**
   * @description authenicate user token
   * 
   * @param user object { id, email, isActive, role }
   * 
   * @returns jwt
   */
  static authenticate = ({ _id, email, isActive, role }) => {
    return jwt.sign({ _id, email, isActive, role},
      process.env.SECRET_KEY, { expiresIn: '720h' });
  }

  /**
   * @description verify jwt token
   * 
   * @param token
   * 
   * @return return decoded payload
   */
  static verifyToken = (token) => {
    const decoded = {};

    try {
      decoded.payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      decoded.error = error.message
    }

    return decoded;
  }

  /**
   * @description verify user token
   * 
   * @param req
   * @param res
   * @parem next
   * 
   * @return { user payload | error }
   */
  static verifyUserToken = async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 'error',
        error: 'no token provided'
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.verifyToken(token);

    if (decoded.error) {
      res.status(500).json({
        status: 'error',
        message: 'failed to authenticate token',
        error: decoded.error
      });
    }

    if (!decoded.payload) {
      return res.status(400).json({
        status: 'error',
        message: 'invalid url parameter'
      });
    }

    const { _id } = decoded.payload;
    const user = await models.User.findOne({ _id });
    if (user) {
      req.decoded = decoded.payload;
      next();
    } else {
      return res.status(404).json({
        status: 'success',
        message: 'user not found'
      });
    }
  }
}
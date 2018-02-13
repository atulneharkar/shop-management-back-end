import moment from 'moment';
import _ from 'lodash';

import User from '../models/user';
import redisClient from '../config/redis';

/**
 * controller for user login
 * POST /user/login
 */
export const login = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findUserByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
};

/**
 * controller for user login-social (facebook and google)
 * POST /user/login-social
 */
export const loginSocial = (req, res) => {
  const body = _.pick(req.body, ['email', 'name', 'avatar', 'loginType']);

  User.findUserBySocialCredentials(body.email).then((user) => {
    if(!user) {
      let userInfo = {
        'name': body.name,
        'email': body.email,
        'avatar': body.avatar,
        'role': 'user'
      }
      if(body.loginType === 'facebook') {
        userInfo['facebook'] = true;
      } else if(body.loginType === 'google') {
        userInfo['google'] = true;
      }

      let user = new User(userInfo); 

      user.save().then(() => {
        return user.generateAuthToken();
      }).then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {console.log(e);
        res.status(400).send(e);
      });
    } else if(user && user[body.loginType] === false) {
      const userID = user._id;
      const userUpdatedData = { [body.loginType]: true };
      
      return User.findByIdAndUpdate(userID, {
        '$set': userUpdatedData
      }, {
        'new': true,
        'runValidators': true,
        'context': 'query'
      })
      .then(user => {
        if(!user) {
          return Promise.reject({'status': 401});
        }
        return user.generateAuthToken();
      }).then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {
        res.status(400).send(e);
      });
    } else {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }
  }).catch((e) => {
    res.status(400).send(e);
  });
};

/**
 * controller for user logout
 * DELETE /user/logout
 */
export const logout = (req, res) => {
  const token = req.header('x-auth');

  redisClient.srem(`auth:${req.user._id}`, [token], err => {
    if(err) {
      res.status(400).send('Unable to logout');
    }

    res.status(200).send();
  });
};

/**
 * controller to send forgot password link
 * POST /forgot-password
 * required email
 */
export const sendOTPLink = (req, res) => {
  const email = req.body.email;
  const secret = req.body.secret;

  if(!email || !secret) {
    return res.status(400).send('All fields are required');
  }

  User.findOne({ email, secret })
    .then(user => {
      if(!user) {
        return Promise.reject({'status': 404});
      }

      return user.generateOTP();
    })
    .then(user => {
      res.status(200).send({
        'otp': user.otp,
        'userID': user._id
      });
    })
    .catch(err => {
      const errCode = err && err.status ? err.status : 400;
      const errMsg = errCode === 404 ?
                    'No such user registered' :
                    'Error while sending reset password link, Please try again';

      res.status(errCode).send(errMsg);
    });
};

/**
 * controller to reset the password
 * POST /reset-password
 * required otp, userID, password
 */
export const resetPassword = (req, res) => {
  const userId = req.body.userId;
  const otp = req.body.otp;
  const password = req.body.password;

  if(!userId || !otp || !password) {
    return res.status(400).send('Unable to reset password, Please provide required data');
  }

  User.findById(userId)
    .then(user => {
      if(!user) {
        return Promise.reject({'status': 404});
      }

      return user.verifyOTPAndResetPassword(otp, password);
    })
    .then(user => {
      res.status(200).send({msg: 'Password has been reset successfully'});
    })
    .catch(err => {
      const errCode = err && err.status ? err.status : 400;
      const errMsg = errCode === 404 ?
                    'No such user registered' :
                    'Reset password link has expired, Please try again';

      res.status(errCode).send(errMsg);
    });

};
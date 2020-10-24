const config = require('config');
const jwt = require('jsonwebtoken');

const _ = require('lodash')
exports.signToken = async(user) => {
  let token = await jwt.sign(_.pick(user,['_id','name','email','role']),config.get('jwtPrivateKey'));
  return token;
}
import jwt from 'jsonwebtoken';
import config from '../../config';

function signToken(user) {
  const roleinfo = user.roles[0].name;
  const payload = {
    issuer: 'boldr',
    subject: user.id,
    algorithms: ['HS256'],
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    email: user.email,
    role: roleinfo
  };
  return jwt.sign(payload, config.token.secret);
}

export default signToken;

import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

export const auth = (context) => {
  const { authorization } = context.req.headers;
  if (!authorization || !authorization.startsWith('Bearer'))
    throw new AuthenticationError('Token not provided');
  const token = authorization.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};

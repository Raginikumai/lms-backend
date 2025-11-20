import jwt from 'jsonwebtoken';
import { ENV } from '../../../config/env';

export const generateAuthToken = (user: { id: string; email: string }) => {
  const token = jwt.sign({ id: user.id, email: user.email }, ENV.JWT_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

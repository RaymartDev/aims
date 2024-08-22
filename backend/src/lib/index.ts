import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (user: any) => {
  const token = jwt.sign(user, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
  return token;
};

const generateHashedPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export { generateToken, generateHashedPassword };

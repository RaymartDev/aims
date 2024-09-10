import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (user: any) => {
  const token = jwt.sign(user, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
  return token;
};

const generateHashedPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

const activeStatus = (obj: any) => {
  const today = new Date();
  const effectiveTo = new Date(obj.effective_to);

  // Check if the current date is less than or equal to effective_to
  return today <= effectiveTo;
};

export { generateToken, generateHashedPassword, activeStatus };
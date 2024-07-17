import jwt from 'jsonwebtoken';

const generateToken = (user: any) => {
  const token = jwt.sign({ user }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
  return token;
};

export { generateToken };

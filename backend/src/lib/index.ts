import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (user: any) => {
  const token = jwt.sign(user, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
  return token;
};

const generateHashedPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

const activeStatus = (obj: any): boolean => {
  const today = new Date();
  const effectiveTo = new Date(obj.effective_to);

  // Check if the current date is less than or equal to effective_to
  return today <= effectiveTo;
};

export const formatReleaseStatus = (status: number): string => {
  let finalStatus = '';
  switch (status) {
    case 0: 
      finalStatus = 'Pending';
      break;
    case 1:
      finalStatus = 'Shipped';
      break;
    case 2:
      finalStatus = 'Received';
      break;
    case 3: 
      finalStatus = 'Completed';
      break;
    case 4:
      finalStatus = 'Cancelled';
      break;
    default:
      finalStatus = '';
      break;
  }
  return finalStatus;
};

export { generateToken, generateHashedPassword, activeStatus };
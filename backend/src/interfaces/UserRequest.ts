import UserInterface from './UserInterface';
import { Request } from 'express';

export default interface UserRequest extends Request {
  user?: UserInterface;
}
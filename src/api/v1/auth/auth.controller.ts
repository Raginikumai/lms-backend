import { type Request, type Response, type NextFunction } from 'express';
import * as userService from '../users/user.service';
import * as authService from './auth.service';
import { registerSchema } from './auth.schema';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const newUser = await userService.createUser(validatedData);
    const token = authService.generateAuthToken(newUser);

    res.status(201).json({ success: true, data: { user: newUser, token: token } });

  } catch (error) {
    next(error);
  }
};

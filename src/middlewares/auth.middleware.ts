import { Request, Response, NextFunction } from 'express';
import { userType } from '../types/user.type';
import UserModel from '../models/user.model';
import jwtTokenManager from '../manager/jwt-token.manager';

interface JwtPayload {
  id: string;
}

declare module 'express' {
  interface Request {
    user?: userType;
  }
}

const jwtInstance = new jwtTokenManager();

export default class AuthMiddleware {
  constructor() {}

  public async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'unauthorized token' });
      return;
    }

    try {
      const payload = jwtInstance.verifyToken(token) as JwtPayload;
      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(401).json({ message: 'unauthorized user' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'unauthorized token' });
      return;
    }
  }

  public async isAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = req.user;

    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(401).json({ message: 'forbidden' });
      return;
    }
  }
}

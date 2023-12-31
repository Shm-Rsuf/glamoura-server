import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import jwtTokenManager from '../manager/jwt-token.manager';
import { handleError } from '../errors/handle.error';

const jwtInstance = new jwtTokenManager();

export default class AuthController {
  constructor() {}
  /* class for user register */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, photoUrl, address, phoneNumber } =
        req.body;
      await Promise.resolve().then(async () => {
        const user = await UserModel.register(
          name,
          email,
          password,
          photoUrl,
          address,
          phoneNumber
        );
        const token = jwtInstance.createToken(user._id);
        res.status(200).json({ user, token });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  /* class for user login */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      await Promise.resolve().then(async () => {
        const user = await UserModel.login(email, password);
        const token = jwtInstance.createToken(user._id);
        res.status(200).json({ user, token });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}

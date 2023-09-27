import dotenv from 'dotenv';
dotenv.config();
import jwt, { JwtPayload } from 'jsonwebtoken';

export default class jwtTokenManager {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
    this.expiresIn = '7d';
  }

  public createToken(id: string): string {
    try {
      const token = jwt.sign({ id }, this.secret, {
        expiresIn: this.expiresIn,
      });
      return token;
    } catch (error) {
      throw Error('token creation failed!');
    }
  }

  public verifyToken(token: string): JwtPayload | string | object {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload;
    } catch (error) {
      throw Error('token verification failed!');
    }
  }
}

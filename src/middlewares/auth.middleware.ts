/* eslint-disable prettier/prettier */
// auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'process.env.JWT_SECRET';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log(authHeader);
    return res.status(401).send('Authorization header missing or invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as {
      userId: string;
      exp: number;
    };

    const now = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < now) {
      const newToken = jwt.sign({ userId: decodedToken.userId }, SECRET_KEY, {
        expiresIn: '1m',
      });
      res.setHeader('Authorization', `Bearer ${newToken}`);
    }
    return next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}

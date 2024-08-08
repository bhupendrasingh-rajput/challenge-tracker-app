import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  userId?: string;
}

export const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) { return res.status(401).json({ message: 'Unauthorized!' }); }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;

    if (!decoded) { return res.status(401).json({ message: 'Token verification failed!' }); }

    req.body.userId = decoded?.userId as string;

    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
}

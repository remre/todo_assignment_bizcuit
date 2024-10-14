import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as JWTJwtPayload, VerifyErrors } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

// Define your custom payload interface
interface CustomJwtPayload {
  id: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: CustomJwtPayload;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: 'Access token missing' });
    return;
  }

  jwt.verify(
    token,
    secretKey,
    (err: VerifyErrors | null, decoded: JWTJwtPayload | string | undefined) => {
      if (err) {
        console.log('Invalid token:', err.message);
        res.status(403).json({ error: 'Invalid token' });
        return;
      }

      if (!decoded || typeof decoded === 'string') {
        console.log('Invalid token format');
        res.status(403).json({ error: 'Invalid token' });
        return;
      }

      // Assign the decoded token to req.user
      req.user = decoded as CustomJwtPayload;
      next();
    }
  );
};

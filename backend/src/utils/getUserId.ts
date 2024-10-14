import { Request } from 'express';

export const getUserId = (req: Request): number => {
  return req.user?.id || 0;
};

import { Request, Response, NextFunction } from 'express';
import db from '../../src/database';
import { getUserId } from '../utils/getUserId';
import { GroupRow } from '../types/express';

export const ensureGeneralGroupExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserId(req);

  db.get(
    `SELECT id FROM groups WHERE name = 'General' AND user_id = ?`,
    [userId],
    (err, row: GroupRow | undefined) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!row) {
        db.run(
          `INSERT INTO groups (name, user_id) VALUES ('General', ?)`,
          [userId],
          function (err) {
            if (err) {
              return res
                .status(500)
                .json({ error: 'Failed to create General group' });
            }

            next();
          }
        );
      } else {
        // 'General' group already exists, proceed
        next();
      }
    }
  );
};

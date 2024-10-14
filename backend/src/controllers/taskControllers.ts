import { Request, Response } from 'express';
import db from '../database';
import { getUserId } from '../utils/getUserId';
import { GroupRow } from '../types/express';

// Task Controllers

export const createTask = (req: Request, res: Response): void => {
  const { title, description, deadline, hour, group } = req.body;
  const userId = getUserId(req);

  db.get(
    // If group doesn't exist, create it
    `SELECT id FROM groups WHERE name = ? AND user_id = ?`,
    [group || 'General', userId],
    (err: Error | null, row: GroupRow | undefined) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const groupId = row ? row.id : null;

      if (!groupId) {
        db.run(
          `INSERT INTO groups (name, user_id) VALUES (?, ?)`,
          [group || 'General', userId],
          function (err: Error | null) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            const insertedGroupId = this?.lastID;
            if (insertedGroupId !== undefined) {
              insertTask(insertedGroupId);
            } else {
              res.status(500).json({ error: 'Failed to retrieve group ID' });
            }
          }
        );
      } else {
        insertTask(groupId);
      }
    }
  );

  function insertTask(groupId: number) {
    db.run(
      `INSERT INTO tasks (title, description, deadline, hour, group_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, deadline, hour, groupId, userId],
      function (err: Error | null) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create task' });
        }
        const insertedTaskId = this?.lastID;
        if (insertedTaskId !== undefined) {
          res.status(201).json({ id: insertedTaskId });
        } else {
          res.status(500).json({ error: 'Failed to retrieve task ID' });
        }
      }
    );
  }
};

export const getAllTasks = (req: Request, res: Response): void => {
  const userId = getUserId(req);

  db.all(
    `SELECT tasks.*, groups.name as 'group' FROM tasks 
     JOIN groups ON tasks.group_id = groups.id 
     WHERE tasks.user_id = ?`,
    [userId],
    (err: Error | null, tasks: any[]) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve tasks' });
      }

      db.all(
        `SELECT * FROM groups WHERE user_id = ? OR user_id IS NULL`,
        [userId],
        (err: Error | null, groups: any[]) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to retrieve groups' });
          }

          res.json({ tasks, groups });
        }
      );
    }
  );
};

export const updateTask = (req: Request, res: Response): void => {
  const { title, description, deadline, hour, done, group } = req.body;
  const userId = getUserId(req);

  db.get(
    `SELECT id FROM groups WHERE name = ? AND user_id = ?`,
    [group || 'General', userId],
    (err: Error | null, row: GroupRow | undefined) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const groupId = row ? row.id : null;

      if (!groupId) {
        db.run(
          `INSERT INTO groups (name, user_id) VALUES (?, ?)`,
          [group || 'General', userId],
          function (err: Error | null) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            const insertedGroupId = this?.lastID;
            if (insertedGroupId !== undefined) {
              updateTaskInDB(insertedGroupId);
            } else {
              res.status(500).json({ error: 'Failed to retrieve group ID' });
            }
          }
        );
      } else {
        updateTaskInDB(groupId);
      }
    }
  );

  function updateTaskInDB(groupId: number) {
    db.run(
      `UPDATE tasks SET title = ?, description = ?, deadline = ?, hour = ?, done = ?, group_id = ? WHERE id = ? AND user_id = ?`,
      [
        title,
        description,
        deadline,
        hour,
        done,
        groupId,
        req.params.id,
        userId,
      ],
      function (err: Error | null) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        const changes = this?.changes;
        res.json({ changes });
      }
    );
  }
};

export const deleteTask = (req: Request, res: Response): void => {
  const userId = getUserId(req);

  db.run(
    `DELETE FROM tasks WHERE id = ? AND user_id = ?`,
    [req.params.id, userId],
    function (err: Error | null) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const changes = this?.changes;
      res.json({ changes });
    }
  );
};

// Group Controllers

export const getGroups = (req: Request, res: Response): void => {
  const userId = getUserId(req);

  db.all(
    `SELECT id, name FROM groups WHERE user_id = ? OR user_id IS NULL`,
    [userId],
    (err: Error | null, groups: any[]) => {
      if (err) {
        console.error('Error retrieving groups:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve groups' });
      }
      res.json(groups);
    }
  );
};

export const createGroup = (req: Request, res: Response): void => {
  const { name } = req.body;
  const userId = getUserId(req);

  if (!name) {
    res.status(400).json({ error: 'Group name is required' });
    return;
  }

  // Check if the group name already exists for this user
  db.get(
    `SELECT id FROM groups WHERE name = ? AND user_id = ?`,
    [name, userId],
    (err: Error | null, row: GroupRow | undefined) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (row) {
        return res.status(400).json({ error: 'Group name already exists' });
      }

      db.run(
        `INSERT INTO groups (name, user_id) VALUES (?, ?)`,
        [name, userId],
        function (err: Error | null) {
          if (err) {
            return res.status(500).json({ error: 'Failed to create group' });
          }
          const insertedGroupId = this?.lastID;
          if (insertedGroupId !== undefined) {
            res.status(201).json({ id: insertedGroupId });
          } else {
            res.status(500).json({ error: 'Failed to retrieve group ID' });
          }
        }
      );
    }
  );
};

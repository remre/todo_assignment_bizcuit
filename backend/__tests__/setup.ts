import { beforeEach, afterAll } from 'vitest';
import db from '../src/database';

beforeEach(() => {
  // Reset the database to a clean state before each test
  db.run('DELETE FROM users');
  db.run('DELETE FROM tasks');
  db.run('DELETE FROM groups');
});

afterAll(() => {
  // Close the database connection after all tests have run
  db.close();
});

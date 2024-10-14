import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../index';
import db from '../src/database';

describe('Task Creation', () => {
  // Clear and reset the database before each test
  beforeEach(() => {
    db.run('DELETE FROM tasks');
    db.run('DELETE FROM users');
    db.run('DELETE FROM groups');
  });

  // Test: Successful task creation
  it('should create a new task successfully', async () => {
    // Use an agent to preserve cookies across requests
    const agent = request.agent(app);

    // First, register a user
    const userRes = await agent
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'password123' });

    expect(userRes.status).toBe(201);

    // Then, log in the user
    const loginRes = await agent
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.headers['set-cookie']).toBeDefined();

    // Create a task
    const taskRes = await agent.post('/api/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
      deadline: '2023-12-31',
      hour: '12:00',
      group: 'General',
    });

    console.log(taskRes.body);

    expect(taskRes.status).toBe(201);
    expect(taskRes.body).toHaveProperty('id');
  });
});

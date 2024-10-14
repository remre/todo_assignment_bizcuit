import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../index';
import db from '../src/database';

describe('Authentication', () => {
  beforeEach(() => {
    db.run('DELETE FROM users');
  });

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser1', password: 'password123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', 'testuser1');
  });

  it('should not register a user with an existing username', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser1', password: 'password123' });

    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser1', password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'User already exists');
  });

  it('should login a user successfully', async () => {
    // Create a new user
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser1', password: 'password123' });

    // Use an agent to preserve cookies across requests
    const agent = request.agent(app);

    const res = await agent
      .post('/api/users/login')
      .send({ username: 'testuser1', password: 'password123' });

    expect(res.status).toBe(200);
    // Since the token is stored in an HTTP-only cookie, we check for the 'Set-Cookie' header
    expect(res.headers['set-cookie']).toBeDefined();

    // Optionally, you can check if the cookie is correctly set
    const cookies = res.headers['set-cookie'];

    if (Array.isArray(cookies)) {
      expect(cookies.some(cookie => cookie.includes('token'))).toBe(true);
    } else if (typeof cookies === 'string') {
      expect(cookies.includes('token')).toBe(true);
    } else {
      throw new Error('No cookies set in response');
    }
  });

  it('should not login a user with wrong credentials', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser1', password: 'password123' });

    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser1', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });
});

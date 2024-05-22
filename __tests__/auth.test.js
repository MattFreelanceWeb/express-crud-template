import authMiddleware from '../middleware/auth';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer token',
      },
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set req.auth with userId and userRole if token is valid', () => {
    const decodedToken = {
      userId: '123',
      role: 'admin',
    };
    jwt.verify.mockReturnValue(decodedToken);

    authMiddleware(req, res, next);

    expect(req.auth).toEqual({
      userId: decodedToken.userId,
      userRole: decodedToken.role,
    });
    expect(next).toHaveBeenCalled();
  });

  test('should throw an error if userId in request body does not match the decoded token', () => {
    const decodedToken = {
      userId: '123',
      role: 'admin',
    };
    jwt.verify.mockReturnValue(decodedToken);

    req.body.userId = '456';

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad User ID' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should throw an error if requiredRole in request body does not match the decoded token', () => {
    const decodedToken = {
      userId: '123',
      role: 'admin',
    };
    jwt.verify.mockReturnValue(decodedToken);

    req.body.requiredRole = 'user';

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Role unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should throw an error if token is invalid', () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Request needs auth token' });
    expect(next).not.toHaveBeenCalled();
  });
});

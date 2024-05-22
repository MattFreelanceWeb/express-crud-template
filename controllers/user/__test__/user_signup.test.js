const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { signup } = require('../signup.js'); // Adjust this path as necessary

jest.mock('bcryptjs');
jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                role: {
                    findUnique: jest.fn().mockResolvedValue({ id: 1 })
                },
                user: {
                    create: jest.fn().mockResolvedValue({ message: "User created" })
                },
                $disconnect: jest.fn()
            };
        })
    };
});

describe('Signup Function Tests', () => {
    let mockRequest, mockResponse;
    beforeEach(() => {
        mockRequest = {
            body: {
                email: 'test@example.com',
                password: 'Password1!'
            }
        };
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn()
        };
        bcrypt.genSaltSync.mockReturnValue(10);
        bcrypt.hashSync.mockReturnValue('hashedpassword');
    });

    it('should create a user when all conditions are met', async () => {
        await signup(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "User created" });
    });

    it('should return an error when the password is too short', async () => {
        mockRequest.body.password = 'Pass1!';
        await signup(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "password must be minimum with 8 char" });
    });
});


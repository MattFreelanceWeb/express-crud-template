const { get } = require('../get'); 

describe('Health Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    it('should return 200 OK with health status', async () => {
        await get(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            uptime: expect.any(Number),
            message: 'OK',
            timestamp: expect.any(Number)
        }));
    });


});

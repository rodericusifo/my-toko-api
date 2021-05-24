import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';

describe('POST /auth/login - Auth Login Endpoint', () => {
    beforeEach(async () => {
        const registerOwner = {
            name: 'Rodericus Ifo Krista',
            email: 'rodericus1999@gmail.com',
            password: await bcrypt.hash('211299', 8),
            role: 'OWNER'
        };
        const newUser = new UserModel(registerOwner);
        await newUser.save();
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to login', async () => {
        const authLogged = await authLogin({
            email: 'rodericus1999@gmail.com',
            password: '211299'
        });
        expect(authLogged.status).toEqual(200);
        expect(authLogged.body).toEqual({
            success: true,
            message: 'Login Success',
            data: {
                Authorization: authLogged.body.data.Authorization
            },
            status: 'OK',
            statusCode: 200
        });
    });
});

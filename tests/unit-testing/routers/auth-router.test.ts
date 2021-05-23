import { userLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';

describe('POST /auth/login - Auth Login Endpoint', () => {
    beforeEach(async () => {
        const registerOwner = {
            name: 'Rodericus Ifo Krista',
            email: 'rodericus1999@gmail.com',
            password: await bcrypt.hash('120399', 8),
            role: 'OWNER'
        };
        const newUser = new UserModel(registerOwner);
        await newUser.save();
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to login', async () => {
        const userLogged = await userLogin({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userLogged.status).toEqual(200);
        expect(userLogged.body).toEqual({
            success: true,
            message: 'Login Success',
            data: {
                Authorization: userLogged.body.data.Authorization
            },
            status: 'OK',
            statusCode: 200
        });
    });
});

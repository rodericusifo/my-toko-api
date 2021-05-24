import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { userCreate } from './helpers/user-router-helper';

describe('POST /user/create - User Create Endpoint', () => {
    let authLoggedResponse: request.Response;
    beforeEach(async () => {
        const registerOwner = {
            name: 'Rodericus Ifo Krista',
            email: 'rodericus1999@gmail.com',
            password: await bcrypt.hash('120399', 8),
            role: 'OWNER'
        };
        const newUser = new UserModel(registerOwner);
        await newUser.save();
        const authLogged = await authLogin({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(authLogged.status).toEqual(200);
        authLoggedResponse = authLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to create user', async () => {
        const userCreated = await userCreate(
            authLoggedResponse.body.data.Authorization,
            {
                name: 'John Doe',
                email: 'john@gmail.com',
                password: '12345',
                role: 'INVENTORY'
            }
        );
        expect(userCreated.status).toEqual(201);
    });
});

import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { userCreate, userList } from './helpers/user-router-helper';

describe('POST /users/create - User Create Endpoint', () => {
    let authLoggedResponse: request.Response;
    beforeEach(async () => {
        const registerOwner = {
            name: 'Rodericus Ifo Krista',
            email: 'rodericus1999@gmail.com',
            password: await bcrypt.hash('211299', 8),
            role: 'OWNER'
        };
        const newUser = new UserModel(registerOwner);
        await newUser.save();
        const authLogged = await authLogin({
            email: 'rodericus1999@gmail.com',
            password: '211299'
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
        expect(userCreated.body).toEqual({
            success: true,
            message: 'Create User Success',
            status: 'Created',
            statusCode: 201
        });
    });
});

describe('GET /users/list - User List Endpoint', () => {
    let authLoggedResponse: request.Response;
    beforeEach(async () => {
        const registerOwner = {
            name: 'Rodericus Ifo Krista',
            email: 'rodericus1999@gmail.com',
            password: await bcrypt.hash('211299', 8),
            role: 'OWNER'
        };
        const newUser = new UserModel(registerOwner);
        await newUser.save();
        const authLogged = await authLogin({
            email: 'rodericus1999@gmail.com',
            password: '211299'
        });
        expect(authLogged.status).toEqual(200);
        const userCreated = await userCreate(
            authLogged.body.data.Authorization,
            {
                name: 'John Doe',
                email: 'john@gmail.com',
                password: '12345',
                role: 'INVENTORY'
            }
        );
        expect(userCreated.status).toEqual(201);
        authLoggedResponse = authLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to see list user', async () => {
        const userListed = await userList(
            authLoggedResponse.body.data.Authorization
        );
        expect(userListed.status).toEqual(200);
        expect(userListed.body).toEqual({
            success: true,
            message: 'Users found',
            data: { Users: userListed.body.data.Users },
            status: 'OK',
            statusCode: 200
        });
    });
});

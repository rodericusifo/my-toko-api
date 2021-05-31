import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { BrandModel } from '../../../src/models/brand-model';
import { brandCreate } from './helpers/brand-router-helper';

describe('POST /brands/create - Brands Create Endpoint', () => {
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
        await BrandModel.deleteMany();
    });
    it('Should be able to create brand', async () => {
        const brandCreated = await brandCreate(
            authLoggedResponse.body.data.Authorization,
            {
                name: 'Indomie'
            }
        );
        expect(brandCreated.status).toEqual(201);
    });
});

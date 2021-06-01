import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { BrandModel } from '../../../src/models/brand-model';
import { brandCreate, brandList } from './helpers/brand-router-helper';

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
        expect(brandCreated.body).toEqual({
            success: true,
            message: 'Create Brand Success',
            status: 'Created',
            statusCode: 201
        });
    });
});

describe('GET /brands/list - Brand List Endpoint', () => {
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
        const brandCreated = await brandCreate(
            authLogged.body.data.Authorization,
            {
                name: 'Indomie'
            }
        );
        expect(brandCreated.status).toEqual(201);
        authLoggedResponse = authLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await BrandModel.deleteMany();
    });
    it('Should be able to see list brand', async () => {
        const brandListed = await brandList(
            authLoggedResponse.body.data.Authorization
        );
        expect(brandListed.status).toEqual(200);
    });
});

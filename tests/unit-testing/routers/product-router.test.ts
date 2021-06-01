import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { ProductModel } from '../../../src/models/product-model';
import { productCreate, productList } from './helpers/product-router-helper';
import { brandCreate, brandList } from './helpers/brand-router-helper';
import { BrandModel } from '../../../src/models/brand-model';

describe('POST /products/create - Products Create Endpoint', () => {
    let authLoggedResponse: request.Response;
    let brandListedResponse: request.Response;
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
        const brandListed = await brandList(authLogged.body.data.Authorization);
        expect(brandListed.status).toEqual(200);
        authLoggedResponse = authLogged;
        brandListedResponse = brandListed;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await BrandModel.deleteMany();
        await ProductModel.deleteMany();
    });
    it('Should be able to create product', async () => {
        const productCreated = await productCreate(
            authLoggedResponse.body.data.Authorization,
            {
                name: 'Indomie Goreng',
                code: 'PRD001',
                Brand: brandListedResponse.body.data.Brands[0]._id
            }
        );
        expect(productCreated.status).toEqual(201);
    });
});

describe('GET /products/list - Products List Endpoint', () => {
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
        const brandListed = await brandList(authLogged.body.data.Authorization);
        expect(brandListed.status).toEqual(200);
        const productCreated = await productCreate(
            authLogged.body.data.Authorization,
            {
                name: 'Indomie Goreng',
                code: 'PRD001',
                Brand: brandListed.body.data.Brands[0]._id
            }
        );
        expect(productCreated.status).toEqual(201);
        authLoggedResponse = authLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await BrandModel.deleteMany();
        await ProductModel.deleteMany();
    });
    it('Should be able to see list product', async () => {
        const productListed = await productList(
            authLoggedResponse.body.data.Authorization
        );
        expect(productListed.status).toEqual(200);
    });
});

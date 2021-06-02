import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { ProductModel } from '../../../src/models/product-model';
import { UOMModel } from '../../../src/models/UOM-model';
import { productCreate, productList } from './helpers/product-router-helper';
import { brandCreate, brandList } from './helpers/brand-router-helper';
import { BrandModel } from '../../../src/models/brand-model';
import { UOMCreate, UOMEditStatus, UOMList } from './helpers/UOM-router-helper';

describe('POST /UOM/create - UOM Create Endpoint', () => {
    let authLoggedResponse: request.Response;
    let productListedResponse: request.Response;
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
        const productListed = await productList(
            authLogged.body.data.Authorization
        );
        expect(productListed.status).toEqual(200);
        authLoggedResponse = authLogged;
        productListedResponse = productListed;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await BrandModel.deleteMany();
        await ProductModel.deleteMany();
        await UOMModel.deleteMany();
    });
    it('Should be able to create UOM', async () => {
        const UOMCreated = await UOMCreate(
            authLoggedResponse.body.data.Authorization,
            {
                name: 'Box',
                purchasePrice: 8000,
                sellingPrice: 8500,
                Product: productListedResponse.body.data.Products[0]._id
            }
        );
        expect(UOMCreated.status).toEqual(201);
    });
});

describe('GET /UOM/list - UOM List Endpoint', () => {
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
        const productListed = await productList(
            authLogged.body.data.Authorization
        );
        expect(productListed.status).toEqual(200);
        const UOMCreated = await UOMCreate(authLogged.body.data.Authorization, {
            name: 'Box',
            purchasePrice: 8000,
            sellingPrice: 8500,
            Product: productListed.body.data.Products[0]._id
        });
        expect(UOMCreated.status).toEqual(201);
        authLoggedResponse = authLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await BrandModel.deleteMany();
        await ProductModel.deleteMany();
        await UOMModel.deleteMany();
    });
    it('Should be able to see list UOM', async () => {
        const UOMListed = await UOMList(
            authLoggedResponse.body.data.Authorization
        );
        expect(UOMListed.status).toEqual(200);
    });
});

describe('PUT /UOM/:UOMID/edit-status - UOM Edit Status Endpoint', () => {
    let authLoggedResponse: request.Response;
    let UOMListedResponse: request.Response;
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
        const productListed = await productList(
            authLogged.body.data.Authorization
        );
        expect(productListed.status).toEqual(200);
        const UOMCreated = await UOMCreate(authLogged.body.data.Authorization, {
            name: 'Box',
            purchasePrice: 8000,
            sellingPrice: 8500,
            Product: productListed.body.data.Products[0]._id
        });
        expect(UOMCreated.status).toEqual(201);
        const UOMListed = await UOMList(authLogged.body.data.Authorization);
        expect(UOMListed.status).toEqual(200);
        authLoggedResponse = authLogged;
        UOMListedResponse = UOMListed;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await BrandModel.deleteMany();
        await ProductModel.deleteMany();
        await UOMModel.deleteMany();
    });
    it('Should be able to see list UOM', async () => {
        const UOMStatusEdited = await UOMEditStatus(
            authLoggedResponse.body.data.Authorization,
            'NOT ACTIVE',
            UOMListedResponse.body.data.UOMList[0]._id
        );
        expect(UOMStatusEdited.status).toEqual(200);
    });
});

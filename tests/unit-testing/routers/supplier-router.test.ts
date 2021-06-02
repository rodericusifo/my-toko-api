import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { SupplierModel } from '../../../src/models/supplier-model';
import { supplierCreate, supplierList } from './helpers/supplier-router-helper';

describe('POST /suppliers/create - Supplier Create Endpoint', () => {
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
        await SupplierModel.deleteMany();
    });
    it('Should be able to create supplier', async () => {
        const supplierCreated = await supplierCreate(
            authLoggedResponse.body.data.Authorization,
            {
                name: 'Marcella Schumm',
                companyName: `Schumm, O'Kon and VonRueden`,
                phoneNumber: `1-996-299-0364`,
                discount: 20,
                email: 'marchella@gmail.com'
            }
        );
        expect(supplierCreated.status).toEqual(201);
    });
});

describe('POST /suppliers/list - Supplier List Endpoint', () => {
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
        const supplierCreated = await supplierCreate(
            authLogged.body.data.Authorization,
            {
                name: 'Marcella Schumm',
                companyName: `Schumm, O'Kon and VonRueden`,
                phoneNumber: `1-996-299-0364`,
                discount: 20,
                email: 'marchella@gmail.com'
            }
        );
        expect(supplierCreated.status).toEqual(201);
        authLoggedResponse = authLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await SupplierModel.deleteMany();
    });
    it('Should be able to create supplier', async () => {
        const supplierListed = await supplierList(
            authLoggedResponse.body.data.Authorization
        );
        expect(supplierListed.status).toEqual(200);
    });
});

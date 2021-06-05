import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { SupplierModel } from '../../../src/models/supplier-model';
import { POModel } from '../../../src/models/PO-model';
import { supplierCreate, supplierList } from './helpers/supplier-router-helper';
import { POCreate } from './helpers/PO-router-helper';

describe('POST /PO/create - PO Create Endpoint', () => {
    let authLoggedResponse: request.Response;
    let supplierListedResponse: request.Response;
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
        const supplierListed = await supplierList(
            authLogged.body.data.Authorization
        );
        expect(supplierListed.status).toEqual(200);
        authLoggedResponse = authLogged;
        supplierListedResponse = supplierListed;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await SupplierModel.deleteMany();
        await POModel.deleteMany();
    });
    it('Should be able to create PO', async () => {
        const POCreated = await POCreate(
            authLoggedResponse.body.data.Authorization,
            {
                PONumber: 'PO001',
                PODate: '2021-06-05',
                shipTo: {
                    name: 'Rodericus Ifo Krista',
                    companyName: 'SALT Academy Indonesia',
                    email: 'rodericus1999@gmail.com',
                    phoneNumber: '0895601214950'
                },
                Supplier: supplierListedResponse.body.data.Suppliers[0]._id
            }
        );
        expect(POCreated.status).toEqual(201);
    });
});

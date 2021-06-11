import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { SupplierModel } from '../../../src/models/supplier-model';
import { POModel } from '../../../src/models/PO-model';
import { supplierCreate, supplierList } from './helpers/supplier-router-helper';
import {
    POCreate,
    POIDAddProduct,
    POIDDetail,
    POList,
    POProductList
} from './helpers/PO-router-helper';
import { productCreate, productList } from './helpers/product-router-helper';
import { brandCreate, brandList } from './helpers/brand-router-helper';
import { UOMCreate, UOMList } from './helpers/UOM-router-helper';
import { ProductModel } from '../../../src/models/product-model';
import { BrandModel } from '../../../src/models/brand-model';
import { UOMModel } from '../../../src/models/UOM-model';
import { POProductModel } from '../../../src/models/PO-product-model';
import { invoiceCreate } from './helpers/invoice-router-helper';

describe('POST /invoices/create - Invoice Create Endpoint', () => {
    let authLoggedResponse: request.Response;
    let POListedResponse: request.Response;
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
        const POCreated = await POCreate(authLogged.body.data.Authorization, {
            PONumber: 'PO001',
            PODate: '2021-06-05',
            shipTo: {
                name: 'Rodericus Ifo Krista',
                companyName: 'SALT Academy Indonesia',
                email: 'rodericus1999@gmail.com',
                phoneNumber: '0895601214950'
            },
            Supplier: supplierListed.body.data.Suppliers[0]._id
        });
        expect(POCreated.status).toEqual(201);
        const POListed = await POList(authLogged.body.data.Authorization);
        expect(POListed.status).toEqual(200);
        authLoggedResponse = authLogged;
        POListedResponse = POListed;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await SupplierModel.deleteMany();
        await POModel.deleteMany();
    });
    it('Should be able to create Invoice', async () => {
        const invoiceCreated = await invoiceCreate(
            authLoggedResponse.body.data.Authorization,
            {
                POID: POListedResponse.body.data.POList[0]._id,
                INVNumber: 'INV001',
                INVDate: '2021-06-11'
            }
        );
        expect(invoiceCreated.status).toEqual(201);
    });
});

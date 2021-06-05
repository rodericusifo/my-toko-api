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
    POList
} from './helpers/PO-router-helper';
import { productCreate, productList } from './helpers/product-router-helper';
import { brandCreate, brandList } from './helpers/brand-router-helper';
import { UOMCreate, UOMList } from './helpers/UOM-router-helper';
import { ProductModel } from '../../../src/models/product-model';
import { BrandModel } from '../../../src/models/brand-model';
import { UOMModel } from '../../../src/models/UOM-model';
import { POProductModel } from '../../../src/models/PO-product-model';

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

describe('GET /PO/list - PO List Endpoint', () => {
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
        authLoggedResponse = authLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await SupplierModel.deleteMany();
        await POModel.deleteMany();
    });
    it('Should be able to see list PO', async () => {
        const POListed = await POList(
            authLoggedResponse.body.data.Authorization
        );
        expect(POListed.status).toEqual(200);
    });
});

describe('GET /PO/:POID/detail - PO ID Detail Endpoint', () => {
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
    it('Should be able to see detail PO', async () => {
        const POIDDetailed = await POIDDetail(
            authLoggedResponse.body.data.Authorization,
            POListedResponse.body.data.POList[0]._id
        );
        expect(POIDDetailed.status).toEqual(200);
    });
});

describe('POST /PO/:POID/add-product - PO ID Add Product Endpoint', () => {
    let authLoggedResponse: request.Response;
    let POListedResponse: request.Response;
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
        UOMListedResponse = UOMListed;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await SupplierModel.deleteMany();
        await POModel.deleteMany();
        await BrandModel.deleteMany();
        await ProductModel.deleteMany();
        await UOMModel.deleteMany();
        await POProductModel.deleteMany();
    });
    it('Should be able to add product to PO', async () => {
        const POIDAddedProduct = await POIDAddProduct(
            authLoggedResponse.body.data.Authorization,
            POListedResponse.body.data.POList[0]._id,
            { quantity: 3, UOM: UOMListedResponse.body.data.UOMList[0]._id }
        );
        expect(POIDAddedProduct.status).toEqual(201);
    });
});

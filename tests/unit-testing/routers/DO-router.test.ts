import request from 'supertest';
import { authLogin } from './helpers/auth-router-helper';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models/user-model';
import { SupplierModel } from '../../../src/models/supplier-model';
import { POModel } from '../../../src/models/PO-model';
import { DOModel } from '../../../src/models/DO-model';
import { supplierCreate, supplierList } from './helpers/supplier-router-helper';
import {
    POCreate,
    POIDAddProduct,
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
import { DOCreate, DOList } from './helpers/DO-router-helper';

describe('POST /DO/create - DO Create Endpoint', () => {
    let authLoggedResponse: request.Response;
    let POProductListedResponse: request.Response;
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
        const POIDAddedProduct = await POIDAddProduct(
            authLogged.body.data.Authorization,
            POListed.body.data.POList[0]._id,
            { quantity: 3, UOM: UOMListed.body.data.UOMList[0]._id }
        );
        expect(POIDAddedProduct.status).toEqual(201);
        const POProductListed = await POProductList(
            authLogged.body.data.Authorization
        );
        expect(POProductListed.status).toEqual(200);
        authLoggedResponse = authLogged;
        POProductListedResponse = POProductListed;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await SupplierModel.deleteMany();
        await POModel.deleteMany();
        await BrandModel.deleteMany();
        await ProductModel.deleteMany();
        await UOMModel.deleteMany();
        await POProductModel.deleteMany();
        await DOModel.deleteMany();
    });
    it('Should be able to create DO', async () => {
        const DOCreated = await DOCreate(
            authLoggedResponse.body.data.Authorization,
            {
                DONumber: 'DO001',
                DODate: '2021-06-09',
                POProduct:
                    POProductListedResponse.body.data.POProductList[0]._id,
                quantity: 2
            }
        );
        expect(DOCreated.status).toEqual(201);
    });
});

describe('GET /DO/list - DO List Endpoint', () => {
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
        const POIDAddedProduct = await POIDAddProduct(
            authLogged.body.data.Authorization,
            POListed.body.data.POList[0]._id,
            { quantity: 3, UOM: UOMListed.body.data.UOMList[0]._id }
        );
        expect(POIDAddedProduct.status).toEqual(201);
        const POProductListed = await POProductList(
            authLogged.body.data.Authorization
        );
        expect(POProductListed.status).toEqual(200);
        const DOCreated = await DOCreate(authLogged.body.data.Authorization, {
            DONumber: 'DO001',
            DODate: '2021-06-09',
            POProduct: POProductListed.body.data.POProductList[0]._id,
            quantity: 2
        });
        expect(DOCreated.status).toEqual(201);
        authLoggedResponse = authLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await SupplierModel.deleteMany();
        await POModel.deleteMany();
        await BrandModel.deleteMany();
        await ProductModel.deleteMany();
        await UOMModel.deleteMany();
        await POProductModel.deleteMany();
        await DOModel.deleteMany();
    });
    it('Should be able to see list DO', async () => {
        const DOListed = await DOList(
            authLoggedResponse.body.data.Authorization
        );
        expect(DOListed.status).toEqual(200);
    });
});

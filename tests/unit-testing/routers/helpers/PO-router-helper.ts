import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const POCreate = async (
    authToken: string,
    PO: {
        PONumber?: string;
        PODate?: string;
        shipTo?: {
            name?: string;
            companyName?: string;
            phoneNumber?: string;
            email?: string;
        };
        Supplier?: string;
    }
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const POCreated = await request(app)
        .post(`/PO/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(PO);
    return POCreated;
};

const POList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const POListed = await request(app)
        .get(`/PO/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return POListed;
};

const POIDDetail = async (authToken: string, POID: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const POIDDetailed = await request(app)
        .get(`/PO/${POID}/detail?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return POIDDetailed;
};

const POIDAddProduct = async (
    authToken: string,
    POID: string,
    POUOM: {
        quantity: number;
        UOM: string;
    }
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const POIDAddedProduct = await request(app)
        .post(`/PO/${POID}/add-product?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(POUOM);
    return POIDAddedProduct;
};

export { POCreate, POList, POIDDetail, POIDAddProduct };

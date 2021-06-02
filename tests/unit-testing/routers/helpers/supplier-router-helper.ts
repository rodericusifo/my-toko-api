import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const supplierCreate = async (
    authToken: string,
    supplier: {
        name?: string;
        companyName?: string;
        phoneNumber: string;
        email?: string;
        discount?: number;
    }
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const supplierCreated = await request(app)
        .post(`/suppliers/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(supplier);
    return supplierCreated;
};

export { supplierCreate };

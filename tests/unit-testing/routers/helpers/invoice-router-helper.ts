import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const invoiceCreate = async (
    authToken: string,
    invoice: {
        POID?: string;
        INVDate?: string;
        INVNumber?: string;
    }
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const invoiceCreated = await request(app)
        .post(`/invoices/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(invoice);
    return invoiceCreated;
};

export { invoiceCreate };

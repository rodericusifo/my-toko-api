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

const invoiceList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const invoiceListed = await request(app)
        .get(`/invoices/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return invoiceListed;
};

const invoiceIDEditStatus = async (
    authToken: string,
    status: string,
    invoiceID: string
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const invoiceIDEditedStatus = await request(app)
        .put(
            `/invoices/${invoiceID}/edit-status?userID=${decoded.id}&&status=${status}`
        )
        .set('Authorization', `${authToken}`);
    return invoiceIDEditedStatus;
};

export { invoiceCreate, invoiceList, invoiceIDEditStatus };

import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const UOMCreate = async (
    authToken: string,
    UOM: {
        name?: string;
        purchasePrice?: number;
        sellingPrice?: number;
        Product?: string;
    }
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const UOMCreated = await request(app)
        .post(`/UOM/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(UOM);
    return UOMCreated;
};

const UOMList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const UOMListed = await request(app)
        .get(`/UOM/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return UOMListed;
};

const UOMEditStatus = async (
    authToken: string,
    status: string,
    UOMID: string
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const UOMListed = await request(app)
        .put(`/UOM/${UOMID}/edit-status?userID=${decoded.id}&&status=${status}`)
        .set('Authorization', `${authToken}`);
    return UOMListed;
};

export { UOMCreate, UOMList, UOMEditStatus };

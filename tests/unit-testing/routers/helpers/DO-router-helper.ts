import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const DOCreate = async (
    authToken: string,
    DO: {
        DONumber?: string;
        DODate?: string;
        quantity?: number;
        POProduct?: string;
    }
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const DOCreated = await request(app)
        .post(`/DO/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(DO);
    return DOCreated;
};

const DOList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const DOListed = await request(app)
        .get(`/DO/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return DOListed;
};

export { DOCreate, DOList };

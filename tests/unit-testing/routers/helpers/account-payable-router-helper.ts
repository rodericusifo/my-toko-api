import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const accountPayableList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const accountPayableListed = await request(app)
        .get(`/AP/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return accountPayableListed;
};

export { accountPayableList };

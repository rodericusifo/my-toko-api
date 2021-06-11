import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const accountRecievableList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const accountRecievableListed = await request(app)
        .get(`/AR/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return accountRecievableListed;
};

export { accountRecievableList };

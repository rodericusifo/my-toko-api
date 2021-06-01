import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const brandCreate = async (authToken: string, brand: { name?: string }) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const brandCreated = await request(app)
        .post(`/brands/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(brand);
    return brandCreated;
};

const brandList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const brandListed = await request(app)
        .get(`/brands/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return brandListed;
};

export { brandCreate, brandList };

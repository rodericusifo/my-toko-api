import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const brandCreate = async (authToken: string, brand: { name?: string }) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const userCreated = await request(app)
        .post(`/brands/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(brand);
    return userCreated;
};

export { brandCreate };

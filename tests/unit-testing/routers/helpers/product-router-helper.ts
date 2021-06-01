import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const productCreate = async (
    authToken: string,
    product: { name?: string; code?: string; Brand?: string }
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const productCreated = await request(app)
        .post(`/products/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(product);
    return productCreated;
};

const productList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const productListed = await request(app)
        .get(`/products/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return productListed;
};

export { productCreate, productList };

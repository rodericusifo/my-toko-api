import request from 'supertest';
import { app } from '../../../../src/app';
import { JWTDecodeAuthToken } from './JWT-decode-helper';

const userCreate = async (
    authToken: string,
    user: { name?: string; email?: string; password?: string; role?: string }
) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const userCreated = await request(app)
        .post(`/users/create?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`)
        .send(user);
    return userCreated;
};

const userList = async (authToken: string) => {
    const decoded = JWTDecodeAuthToken(authToken);
    const userListed = await request(app)
        .get(`/users/list?userID=${decoded.id}`)
        .set('Authorization', `${authToken}`);
    return userListed;
};

export { userCreate, userList };

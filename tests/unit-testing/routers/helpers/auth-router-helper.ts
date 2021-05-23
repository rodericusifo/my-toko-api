import request from 'supertest';
import { app } from '../../../../src/app';

const userLogin = async (user: { email?: string; password?: string }) => {
    const userLogged = await request(app).post('/auth/login').send(user);
    return userLogged;
};

export { userLogin };

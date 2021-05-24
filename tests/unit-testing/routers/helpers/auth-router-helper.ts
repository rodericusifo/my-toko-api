import request from 'supertest';
import { app } from '../../../../src/app';

const authLogin = async (user: { email?: string; password?: string }) => {
    const authLogged = await request(app).post('/auth/login').send(user);
    return authLogged;
};

export { authLogin };

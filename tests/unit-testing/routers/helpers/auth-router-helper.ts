import request from 'supertest';
import { app } from '../../../../src/app';

const authLogin = async (user: { email?: string; password?: string }) => {
    const authLogged = await request(app).post('/auth/login').send(user);
    return authLogged;
};

const authPasswordResetRequest = async (user: { email?: string}) => {
    const authPasswordResetRequested = await request(app).post('/auth/password/reset-request').send(user);
    return authPasswordResetRequested;
};

export { authLogin, authPasswordResetRequest };

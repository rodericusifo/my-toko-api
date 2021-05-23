import { Document } from 'mongoose';

interface IUserDoc extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    ownerName?: string;
}

export { IUserDoc };

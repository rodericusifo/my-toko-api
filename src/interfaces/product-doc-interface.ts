import { Document } from 'mongoose';

interface IProductDoc extends Document {
    name: string;
    code: string;
    image: string;
    Brand: string;
}

export { IProductDoc };

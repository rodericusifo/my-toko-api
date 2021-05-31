import { Document } from 'mongoose';

interface IBrandDoc extends Document {
    name: string;
}

export { IBrandDoc };

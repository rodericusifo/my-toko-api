import validator from 'validator';
import { Schema, Model, model } from 'mongoose';
import { IUserDoc } from '../interfaces/user-doc-interface';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            validate: [validator.isEmail, 'Please fill a valid email address']
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        role: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        ownerName: {
            type: String,
            trim: true,
            unique: true
        }
    },
    { timestamps: true }
);

const UserModel: Model<IUserDoc> = model<IUserDoc>('User', UserSchema);

export { UserModel };

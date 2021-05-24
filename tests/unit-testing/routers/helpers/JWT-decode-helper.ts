import { IDecodedToken } from '../../../../src/interfaces/decoded-token-interface';

import jwt from 'jsonwebtoken';

const JWTDecodeAuthToken = (authToken: string) => {
    const decoded = jwt.verify(
        authToken.replace('Bearer ', ''),
        process.env.SECRET_KEY!
    ) as IDecodedToken;
    return decoded;
};

export { JWTDecodeAuthToken };

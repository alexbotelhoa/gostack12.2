import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decode = verify(token, authConfig.jwt.secret);

        const { sub } = decode as TokenPayLoad;

        request.user = {
            id: sub
        };

        return next();
    } catch (err) {
        throw new Error('Invalid JWT token');
    }
}
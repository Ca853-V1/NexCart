import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

const custKey = process.env.JWT_SECRET_CUSTOMER as string;

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username: string;
                role: 'customer' | 'seller';
            };
        }
    }
}

const customerAuthenticateJwt = (req: Request, res: Response, next: NextFunction)=>
{
    const authHeader = req.headers.authorization;
    if(!authHeader)
    {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    if(!token)
    {
        return res.sendStatus(401);
    }
    verify(token, custKey, (err, decoded)=>
    {
        if(err || !decoded)
        {
            return res.sendStatus(403);
        }
        const payload = decoded as JwtPayload;
        req.user = {
            id: payload.id,
            username: payload.username,
            role: payload.role as 'customer'
        };
        next();
    });
};

export default { customerAuthenticateJwt };
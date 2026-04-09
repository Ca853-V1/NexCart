import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

const sellerKey = process.env.JWT_SECRET_SELLER as string;

const sellerAuthenticateJwt = (req: Request, res: Response, next: NextFunction)=>
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
    verify(token, sellerKey, (err, decoded)=>
    {
        if(err || !decoded)
        {
            return res.sendStatus(403);
        }
        const payload = decoded as JwtPayload;
        req.user = {
            id: payload.id,
            username: payload.username,
            role: payload.role as 'seller'
        };
        next();
    });
};

export default { sellerAuthenticateJwt }

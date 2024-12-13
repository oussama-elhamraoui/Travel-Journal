import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserById } from '../models/userModel.js';

dotenv.config();

export function requireAuth(req,res,next){
    const token = req.cookies.jwt;
    console.log(token)

    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
            if(err){
                console.log('JWT verification error:', err);
                req.user=null;
                res.status(401).json({ message: 'Unauthorized' });
            }else{
                console.log(decodedToken)
                let user = await findUserById(decodedToken.id);
                console.log(user);
                req.user=user;
                next();
            }
        });
    }else{
        req.user=null;
        res.status(401).json({ message: 'Unauthorized' });
    }
}
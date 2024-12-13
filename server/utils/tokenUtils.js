import express from 'express';
import jwt from 'jsonwebtoken';



export function createToken(id,maxAge){
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:maxAge});
}
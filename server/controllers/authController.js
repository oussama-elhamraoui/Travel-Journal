import {findUserByUsernameOrEmail,createUser,findUserByEmail} from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {createToken} from '../utils/tokenUtils.js';

dotenv.config();



export async function signup_post(req,res){
    try{
        const {username,email,password}=req.body;
        if(!username ||!email||!password){
            return res.status(400).json({msg:'Please provide all fields'});
        }
        
        if(!validator.isEmail(email)){
            return res.status(400).json({msg:'Invalid email format'});
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user ={
            username,
            email,
            password:hashedPassword
        };
        const existingUser = await findUserByUsernameOrEmail(username,email);
        if(existingUser){
            return res.status(400).json({msg:'Username or email already exists'});
        }
        const newUser = await createUser(user);
        if(!newUser){
            return res.status(400).json({msg:'Error while creating the user'});
        }else{
            const maxAge=3*24*60*60;
            const token = createToken(newUser.id,maxAge);
            console.log('Max Age:', maxAge, 'Token:', token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,sameSite: 'Lax' });
            return res.status(201).json({msg:'User created successfully'});
        }
    }catch(err){
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal server error' });
          }
    }

}

export async function login_post(req,res){
    const {email,password} = req.body;
    try{
        console.log(email)
      const user = await findUserByEmail(email);
      console.log(user)
      if(!user){
        return res.status(400).json({msg:'Invalid email or password'});
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({msg:'Invalid email or password'});
      }
      const maxAge=3*24*60*60;
      const token = createToken(user.id,maxAge);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,sameSite: 'Lax' });
      res.status(200).json({msg:'Login successful'})

    }catch(err){
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal server error' });
          }
    }
}
export function getCurrentUser(req,res){
    if(req.user){
        console.log(req.user);
        res.status(200).json({user:req.user});
    }else{
        res.status(401).json({ message: 'No user authenticated' });
    }
}
export function logout_get(req,res){
    res.cookie('jwt','',{maxAge:1})
    res.status(200).json({user:null})
    console.log('logged out');
}

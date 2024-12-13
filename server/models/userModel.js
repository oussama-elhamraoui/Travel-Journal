import pool from '../db/db.js';
import { v4 as uuidv4 } from 'uuid'; 

export async function findUserByUsernameOrEmail(username,email){
    try {
        const result = await pool.query(
          'SELECT * FROM users WHERE username = $1 OR email = $2',
          [username, email]
        );
        return result.rows[0]; // Returns user if found, otherwise undefined
      } catch (err) {
        throw err;
      }    
}
export async function findUserByEmail(email){
  try{
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]);
    return result.rows[0];
  }catch(err){
    throw err;
  }
}

export async function findUserById(id){
  try{
    const result = await pool.query(
      'SELECT id,username,email FROM users WHERE id = $1',
      [id]);
    return result.rows[0];
  }catch(err){
    throw err;
  }
}

export async function createUser(newUser){
    const  {username,email,password}=newUser;
    console.log(username,email,password)
    try {
        const userId=uuidv4();
        const result = await pool.query(
            'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, username, email, password]
          );
    
        return result.rows[0]; // Return the newly created user
      } catch (err) {
        throw err;
      }
} 
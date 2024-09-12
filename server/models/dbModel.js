import pool from '../db/db.js'

export async function getRows(){
    const result = await pool.query("SELECT * FROM travel_journal_posts")
    return result.rows
}

export async function getRowById(postId){
  const queryText = `SELECT * FROM travel_journal_posts WHERE id = $1`
  try{
    const result = await pool.query(queryText,[postId])
    return  result.rows[0]
  }catch(err){
    throw new Error('Database Error: '+err.message)
  }
}

export async function insertRow(newPost){
    const {title, location, googlemapsurl, startdate, enddate, description, imageurl } = newPost;
    const queryText = `
      INSERT INTO travel_journal_posts (title, location, googlemapsurl, startdate, enddate, description, imageurl)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`; // Return the inserted row
    const values = [title, location, googlemapsurl, startdate, enddate, description, imageurl];
    try {
        const result = await pool.query(queryText, values);
        return result.rows[0]; // Ensure this is an object, not undefined
      } catch (err) {
        throw new Error('Database Insertion Error: ' + err.message);
      }
}

export async function updateRow(updPost,postId){
  const {title, location, googlemapsurl, startdate, enddate, description, imageurl } = updPost;
  const queryText = `
    UPDATE travel_journal_posts SET title=$1, location=$2, googlemapsurl=$3, startdate=$4, enddate=$5, description=$6, imageurl=$7 WHERE id=$8
    RETURNING *;`; // Return the inserted row
  const values = [title, location, googlemapsurl, startdate, enddate, description, imageurl,postId];
  try {
      const result = await pool.query(queryText, values);
      return result.rows[0]; // Ensure this is an object, not undefined
    } catch (err) {
      throw new Error('Database Insertion Error: ' + err.message);
    }
}

export async function deleteRow(postId){
  const queryText = `
    DELETE FROM travel_journal_posts WHERE id = $1
    RETURNING *;`
  const values = [postId]
  try{
    const result = await pool.query(queryText,values)
    return result.rows[0]
  }catch(err){
    throw new Error('Database Insertion Error: ' + err.message);
  }
}
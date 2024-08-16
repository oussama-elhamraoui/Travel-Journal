import pool from '../db/db.js'

export async function getRows(){
    const result = await pool.query("SELECT * FROM travel_journal_posts")
    return result.rows
}

export async function getRowById(postId){
  const queryText = `SELECT * FROM travel_journal_posts WHERE id = $1`
  try{
    const result = await pool.query(queryText,[postId])
    return  result.rows
  }catch(err){
    throw new Error('Database Error: '+err.message)
  }
}

export async function insertRow(newPost){
    const {title, location, googleMapsUrl, startDate, endDate, description, imageUrl } = newPost;
    const queryText = `
      INSERT INTO travel_journal_posts (title, location, googleMapsUrl, startDate, endDate, description, imageUrl)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`; // Return the inserted row
    const values = [title, location, googleMapsUrl, startDate, endDate, description, imageUrl];
    try {
        const result = await pool.query(queryText, values);
        return result.rows[0]; // Ensure this is an object, not undefined
      } catch (err) {
        throw new Error('Database Insertion Error: ' + err.message);
      }
}

export async function updateRow(updPost,postId){
  const {title, location, googleMapsUrl, startDate, endDate, description, imageUrl } = updPost;
  const queryText = `
    UPDATE travel_journal_posts SET title=$1, location=$2, googleMapsUrl=$3, startDate=$4, endDate=$5, description=$6, imageUrl=$7 WHERE id=$8
    RETURNING *;`; // Return the inserted row
  const values = [title, location, googleMapsUrl, startDate, endDate, description, imageUrl,postId];
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
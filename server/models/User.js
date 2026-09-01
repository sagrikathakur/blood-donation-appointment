import pool from "../config/db.js";


// create a user model//
export const createUser = async (data) => {
  const { name, email, password, role = 'user' } = data;
  const result = await pool.query(
    `
    INSERT INTO users(name , email , password , role)
    VALUES ($1 , $2 , $3 , $4)
    RETURNING id, name, email, role, created_at; 

    ` ,
    [name, email, password, role]

  )
  return result.rows[0]
}
// find user by email//

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `
SELECT * FROM users 
WHERE email = $1 ;

    ` ,
    [email]
  );
  return result.rows[0];
};



// get all users//

// get users by id //

// update users//

// delete users//
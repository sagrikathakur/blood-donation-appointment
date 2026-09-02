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

export const getAllUsers = async () => {
  const result = await pool.query(
    `
  SELECT id , name , email , role , created_at 
  FROM users
  ORDER BY created_at DESC;
  `
  );
  return result.rows;
}

// get users by id//

export const getUserById = async (id) => {
  const result = await pool.query(
    `
    SELECT id, name, email, role, created_at 
    FROM users
    WHERE id = $1;
    `,
    [id]
  );
  return result.rows[0];
}

// update user

export const updateuser = async (id, data) => {
  const { name, email, role } = data;
  if (role) {
    const result = await pool.query(
      `
      UPDATE users 
      SET name = $2,
          email = $3,
          role = $4
      WHERE id = $1
      RETURNING id, name, email, role, created_at;
      `,
      [id, name, email, role]
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      `
      UPDATE users 
      SET name = $2,
          email = $3
      WHERE id = $1
      RETURNING id, name, email, role, created_at;
      `,
      [id, name, email]
    );
    return result.rows[0];
  }
};


// delete//
export const deleteUser = async (id) => {
  const result = await pool.query(
    ` DELETE FROM users
      WHERE id = $1 
      RETURNING id, name, email, role;
       `,
    [id]);
  return result.rows[0];
};
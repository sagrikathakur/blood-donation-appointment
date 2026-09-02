import pool from '../config/db.js';

export const fixDbConstraints = async () => {
  try {
    // Drop restrictive legacy check constraint if it exists
    await pool.query(`
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
    `);

    // Add updated flexible check constraint for all valid roles
    await pool.query(`
      ALTER TABLE users ADD CONSTRAINT users_role_check 
      CHECK (LOWER(role) IN ('user', 'admin', 'donor', 'recipient'));
    `);

    console.log('✅ PostgreSQL users_role_check constraint updated successfully');
  } catch (error) {
    console.error('⚠️ Note on Database Constraint Setup:', error.message);
  }
};

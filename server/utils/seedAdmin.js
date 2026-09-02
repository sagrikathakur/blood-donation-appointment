import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import { findUserByEmail, createUser } from '../models/User.js';

export const seedAdminUser = async () => {
  try {
    const adminEmail = 'admin@lifepulse.org';
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const existingAdmin = await findUserByEmail(adminEmail);

    if (!existingAdmin) {
      const newAdmin = await createUser({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Default Admin Account Seeded:', newAdmin.email);
    } else {
      // Force update role to 'admin' and password to 'admin123'
      await pool.query(
        "UPDATE users SET role = 'admin', password = $1 WHERE email = $2 OR name ILIKE '%admin%'",
        [hashedPassword, adminEmail]
      );
      console.log('✅ Admin Account Role updated to admin in database');
    }
  } catch (error) {
    console.error('⚠️ Note on Admin Seeding (DB status):', error.message);
  }
};

import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  email: z.string().email("Invalid email address format").toLowerCase().trim(),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
  role: z.enum(['user', 'donor', 'admin']).optional().default('user')
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address format").toLowerCase().trim(),
  password: z.string().min(1, "Password is required")
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  email: z.string().email().toLowerCase().trim().optional(),
  role: z.enum(['user', 'donor', 'admin']).optional()
});

export const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse(req.body);
    req.body = validated;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issue = error.issues[0];
      return res.status(400).json({
        success: false,
        message: `${issue.path.join('.')}: ${issue.message}`
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Invalid input payload'
    });
  }
};

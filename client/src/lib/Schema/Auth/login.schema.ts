import * as z from 'zod';

const LoginSchema = z.object({
    email: z.string().email('Email must be correct !'),
    password: z.string().min(5, 'Password must be higher 5 characters !'),
});

export type LoginType = z.infer<typeof LoginSchema>;
export default LoginSchema;

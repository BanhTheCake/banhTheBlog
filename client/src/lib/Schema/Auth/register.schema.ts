import * as z from 'zod';

const RegisterSchema = z.object({
    email: z
        .string()
        .nonempty('Email is required')
        .email({ message: 'Email is invalid or already taken' }),
    password: z
        .string()
        .nonempty('Password is required')
        .min(6, { message: 'Password must has at least 6 character' }),
    username: z
        .string()
        .nonempty('Username is required')
        .min(6, { message: 'Username must has at least 6 character' }),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
export default RegisterSchema;

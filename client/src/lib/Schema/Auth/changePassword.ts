import * as z from 'zod';

const ZChangePassword = z
    .object({
        currentPassword: z
            .string()
            .nonempty('Current password is required')
            .min(3, 'Current Password must have at least 3 character'),
        password: z
            .string()
            .nonempty('Password is required')
            .min(6, 'Password must have at least 6 character'),
        cfPassword: z
            .string()
            .nonempty('Confirm password is required')
            .min(6, 'Confirm password must have at least 6 character'),
    })
    .refine((data) => data.cfPassword === data.password, {
        message: "Password don't match",
        path: ['cfPassword'],
    });

export type ChangePasswordType = z.infer<typeof ZChangePassword>;
export default ZChangePassword;
